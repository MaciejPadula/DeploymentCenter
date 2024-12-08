using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Infrastructure.K8s.Mappers;
using Json.Patch;
using k8s;
using k8s.Autorest;
using k8s.Models;
using System.Text.Json;
using System.Threading.Tasks;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sDeploymentClient(
    IKubernetesClientFactory kubernetesClientFactory,
    IK8sDeploymentMapper deploymentMapper) : IDeploymentClient
{
    private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, WriteIndented = true };

    public async Task CreateDeployment(Deployment deployment)
    {
        using var client = kubernetesClientFactory.GetClient();
        await client.AppsV1.CreateNamespacedDeploymentAsync(
            deploymentMapper.Map(deployment),
            deployment.Namespace);
    }

    public async Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deployments = await client.AppsV1.ListNamespacedDeploymentAsync(@namespace);
        return deployments
            .Items
            .Select(deploymentMapper.MapBasicInfo)
            .ToList();
    }

    public async Task<List<Container>> GetContainers(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        return deploy?
            .Spec?
            .Template?
            .Spec?
            .Containers?
            .Select(deploymentMapper.MapContainer)?
            .ToList() ?? [];
    }

    public async Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        if (deploy is null)
        {
            return null;
        }

        return new(
            deploy.Metadata.NamespaceProperty,
            deploy.Metadata.Name,
            deploy.Spec.Selector.MatchLabels.TryGetValue(K8sConsts.ApplicationNameDictionaryKey, out var applicationName) ? applicationName : string.Empty,
            deploy.Status.AvailableReplicas ?? 0,
            deploy.Spec.Replicas ?? 0);
    }

    public async Task<bool> DeploymentExists(string @namespace, string deploymentName)
    {
        try
        {
            using var client = kubernetesClientFactory.GetClient();
            var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
            return deploy is not null;
        }
        catch (HttpOperationException e)
        {
            if (e.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }

            throw;
        }
    }

    public async Task RestartDeployment(string @namespace, string deploymentName) =>
        await PatchDeployment(
            @namespace,
            deploymentName,
            deployment =>
            {
                var now = DateTimeOffset.Now.ToUnixTimeSeconds();
                var restart = new Dictionary<string, string>
                {
                    ["date"] = now.ToString()
                };
                deployment.Spec.Template.Metadata.Annotations = restart;
                return deployment;
            });

    public async Task ScaleDeployment(string @namespace, string deploymentName, int replicas) =>
        await PatchDeployment(
            @namespace,
            deploymentName,
            deployment =>
            {
                deployment.Spec.Replicas = replicas;
                return deployment;
            });

    public async Task RemoveDeployment(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        await client.AppsV1.DeleteNamespacedDeploymentAsync(deploymentName, @namespace);
    }

    public async Task UpdateEnvironmentVariables(string @namespace, string deploymentName, string containerName, List<EnvironmentVariable> environmentVariables) =>
        await PatchDeployment(
            @namespace,
            deploymentName,
            deployment =>
            {
                deployment.Spec.Template.Spec.Containers = deployment.Spec.Template.Spec.Containers
                    .Select(container =>
                    {
                        if (container.Name == containerName)
                        {
                            container.Env = deploymentMapper.MapEnvVars(environmentVariables).ToList();
                        }
                        return container;
                    })
                    .ToList();
                return deployment;
            });

    private async Task PatchDeployment(string @namespace, string deploymentName, Func<V1Deployment, V1Deployment> patcher)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deployment = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        var old = JsonSerializer.SerializeToDocument(deployment, JsonOptions);
        var expected = JsonSerializer.SerializeToDocument(patcher(deployment));
        var patch = old.CreatePatch(expected);
        await client.AppsV1.PatchNamespacedDeploymentAsync(new V1Patch(patch, V1Patch.PatchType.JsonPatch), deploymentName, @namespace);
    }

    public async Task ConnectVolume(string @namespace, string deploymentName, string volumeName, string containerName, string mountPath)
    {
        using var client = kubernetesClientFactory.GetClient();

        var volume = await client.CoreV1.ReadPersistentVolumeAsync(volumeName);

        var claimName = $"{volumeName}-claim";

        var existingClaim = await GetClaim(claimName, @namespace);

        if (existingClaim is null)
        {
            var claim = new V1PersistentVolumeClaim
            {
                Metadata = new V1ObjectMeta
                {
                    Name = claimName,
                    NamespaceProperty = @namespace
                },
                Spec = new V1PersistentVolumeClaimSpec
                {
                    AccessModes = ["ReadWriteOnce"],
                    Resources = new V1VolumeResourceRequirements
                    {
                        Requests = new Dictionary<string, ResourceQuantity>
                        {
                            { "storage", volume.Spec.Capacity["storage"] }
                        }
                    }
                }
            };

            await client.CoreV1.CreateNamespacedPersistentVolumeClaimAsync(claim, @namespace);
        }

        await PatchDeployment(
            @namespace,
            deploymentName,
            deployment =>
            {
                var container = deployment.Spec.Template.Spec.Containers.First(x => x.Name == containerName);

                container.VolumeMounts ??= [];

                container.VolumeMounts.Add(new V1VolumeMount
                {
                    Name = volumeName,
                    MountPath = mountPath
                });

                deployment.Spec.Template.Spec.Volumes ??= [];

                deployment.Spec.Template.Spec.Volumes.Add(new V1Volume
                {
                    Name = volumeName,
                    PersistentVolumeClaim = new V1PersistentVolumeClaimVolumeSource
                    {
                        ClaimName = claimName
                    }
                });
                return deployment;
            });
    }

    private async Task<V1PersistentVolumeClaim?> GetClaim(string @namespace, string claimName)
    {
        try
        {
            using var client = kubernetesClientFactory.GetClient();
            return await client.CoreV1.ReadNamespacedPersistentVolumeClaimAsync(claimName, @namespace);
        }
        catch (HttpOperationException e)
        {
            if (e.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

            throw;
        }
    }

    public async Task<List<DeploymentVolume>> GetDeploymentVolumes(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        return deploy?
            .Spec?
            .Template?
            .Spec?
            .Volumes?
            .Select(deploymentMapper.MapVolume)?
            .ToList() ?? [];
    }
}
