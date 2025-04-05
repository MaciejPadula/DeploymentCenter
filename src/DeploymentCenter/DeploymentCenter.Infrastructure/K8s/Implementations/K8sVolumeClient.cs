using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Volumes.Core.Models;
using DeploymentCenter.Volumes.Features;
using k8s;
using k8s.Autorest;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sVolumeClient(IKubernetesClientFactory kubernetesClientFactory) : IVolumeClient
{
    public async Task CreateVolume(string volumeName, string volumePath, int capacityInKibiBytes)
    {
        using var client = kubernetesClientFactory.GetClient();
        await client.CoreV1.CreatePersistentVolumeAsync(
            new V1PersistentVolume
            {
                Metadata = new V1ObjectMeta
                {
                    Name = volumeName
                },
                Spec = new V1PersistentVolumeSpec
                {
                    Capacity = new Dictionary<string, ResourceQuantity>()
                    {
                        { "storage", new ResourceQuantity($"{capacityInKibiBytes}Ki") }
                    },
                    AccessModes = ["ReadWriteOnce"],
                    HostPath = new V1HostPathVolumeSource
                    {
                        Path = volumePath
                    }
                }
            });
    }

    public async Task DeleteVolume(string volumeName)
    {
        using var client = kubernetesClientFactory.GetClient();

        await client.CoreV1.DeletePersistentVolumeAsync(volumeName);
    }

    public async Task<List<Volume>> GetVolumes()
    {
        using var client = kubernetesClientFactory.GetClient();

        var volumes = await client.CoreV1.ListPersistentVolumeAsync();

        var mapped = volumes.Items
            .Select(x => new Volume(
                x.Metadata.Name,
                x.Spec.HostPath.Path,
                x.Spec.Capacity["storage"].ToInt64() / 1024))
            .ToList();

        return mapped;
    }

    public async Task<bool> VolumeExists(string volumeName)
    {
        try
        {
            using var client = kubernetesClientFactory.GetClient();
            var deploy = await client.CoreV1.ReadPersistentVolumeAsync(volumeName);
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
}
