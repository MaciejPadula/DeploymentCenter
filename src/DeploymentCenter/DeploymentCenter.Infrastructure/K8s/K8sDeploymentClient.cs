using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using Json.Patch;
using k8s;
using k8s.Autorest;
using k8s.Models;
using System.Text.Json;

namespace DeploymentCenter.Infrastructure.K8s;

internal class K8sDeploymentClient(
    IKubernetesClientFactory kubernetesClientFactory,
    IK8sDeploymentMapper deploymentMapper) : IDeploymentClient
{
    private readonly IKubernetes _kubernetes = kubernetesClientFactory.GetClient();

    private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, WriteIndented = true };

    public async Task<bool> AreMetricsAvailable()
    {
        try
        {
            var metrics = await _kubernetes.GetKubernetesNodesMetricsAsync();
            return true;
        }
        catch (HttpOperationException ex)
        {
            if (ex.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }

            throw;
        }
    }

    public async Task CreateDeployment(Deployment deployment)
    {
        await _kubernetes.AppsV1.CreateNamespacedDeploymentAsync(
            deploymentMapper.Map(deployment),
            deployment.Namespace);
    }

    public async Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace)
    {
        var deployments = await _kubernetes.AppsV1.ListNamespacedDeploymentAsync(@namespace);
        return deployments
            .Items
            .Select(deploymentMapper.MapBasicInfo)
            .ToList();
    }

    public async Task<List<Container>> GetContainers(string @namespace, string deploymentName)
    {
        var deploy = await _kubernetes.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        return deploy?
            .Spec?
            .Template?
            .Spec?
            .Containers?
            .Select(deploymentMapper.MapContainer)?
            .ToList() ?? [];
    }

    public async Task<List<Deployments.Infrastructure.ContainerMetrics>> GetDeploymentStatistics(string @namespace, string deploymentName)
    {
        var deploy = await _kubernetes.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        if (deploy is null)
        {
            return [];
        }

        var pods = await _kubernetes.CoreV1.ListNamespacedPodAsync(@namespace);

        var metrics = await _kubernetes.GetKubernetesPodsMetricsByNamespaceAsync(@namespace);

        return metrics.Items
            .Where(x => x.Metadata.Name.StartsWith(deploymentName))
            .SelectMany(deploymentMapper.MapMetrics)
            .ToList();
    }

    public async Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName)
    {
        var deploy = await _kubernetes.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
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

    public async Task<string> GetPodLogs(string @namespace, string podName)
    {
        using var result = await _kubernetes.CoreV1
            .ReadNamespacedPodLogWithHttpMessagesAsync(
                podName,
                @namespace)
            .ConfigureAwait(false);

        using var reader = new StreamReader(result.Body, System.Text.Encoding.UTF8);
        return await reader.ReadToEndAsync();
    }

    public async Task<List<Pod>> GetPods(string @namespace, string deploymentName)
    {
        var pods = await _kubernetes.CoreV1.ListNamespacedPodAsync(@namespace);
        return pods?.Items?
            .Where(x => x?.Metadata?.Name?.StartsWith(deploymentName) ?? false)
            .Select(x => new Pod(
                x.Metadata.Name,
                x.Status.Phase,
                x.Status.PodIP,
                !x.Status.ContainerStatuses.Any(c => !c.Ready)))
            .ToList() ?? [];
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

    private async Task PatchDeployment(string @namespace, string deploymentName, Func<V1Deployment, V1Deployment> patcher)
    {
        var deployment = await _kubernetes.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        var old = JsonSerializer.SerializeToDocument(deployment, JsonOptions);
        var expected = JsonSerializer.SerializeToDocument(patcher(deployment));
        var patch = old.CreatePatch(expected);
        await _kubernetes.AppsV1.PatchNamespacedDeploymentAsync(new V1Patch(patch, V1Patch.PatchType.JsonPatch), deploymentName, @namespace);
    }

    public async Task RemoveDeployment(string @namespace, string deploymentName) =>
        await _kubernetes.AppsV1.DeleteNamespacedDeploymentAsync(deploymentName, @namespace);
}
