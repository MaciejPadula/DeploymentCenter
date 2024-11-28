using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features;
using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Infrastructure.K8s.Mappers;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sPodClient(
    IKubernetesClientFactory kubernetesClientFactory,
    IK8sPodMapper k8SPodMapper) : IPodClient
{
    public async Task<string> GetPodLogs(string @namespace, string podName)
    {
        using var client = kubernetesClientFactory.GetClient();
        using var result = await client.CoreV1
            .ReadNamespacedPodLogWithHttpMessagesAsync(
                podName,
                @namespace)
            .ConfigureAwait(false);

        if (result.Response.StatusCode == System.Net.HttpStatusCode.OK)
        {
            using var reader = new StreamReader(result.Body, System.Text.Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }

        return string.Empty;
    }

    public async Task<List<Pod>> GetPods(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var pods = await client.CoreV1.ListNamespacedPodAsync(@namespace);
        return pods?.Items?
            .Where(x => x.Metadata.Name.StartsWith(deploymentName))
            .Select(k8SPodMapper.Map)
            .ToList() ?? [];
    }

    public async Task RemovePod(string @namespace, string podName)
    {
        using var client = kubernetesClientFactory.GetClient();
        await client.CoreV1.DeleteNamespacedPodAsync(podName, @namespace);
    }
}
