using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.IndexResources;
using DeploymentCenter.Search.Features.SearchResources;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;
internal class K8sResourceProvider(IKubernetesClientFactory kubernetesClientFactory) : ISearchQueryExecutor, IResourceProvider
{
    public async Task<List<Resource>> ExecuteQueryAsync(string phrase)
    {
        var resources = await GetResourcesAsync();

        return resources
            .Where(x => x.Name.Contains(phrase))
            .ToList();
    }

    public async Task<List<Resource>> GetResourcesAsync()
    {
        using var client = kubernetesClientFactory.GetClient();

        var deploymentsTask = client.AppsV1.ListDeploymentForAllNamespacesAsync();
        var loadBalancersTask = client.CoreV1.ListServiceForAllNamespacesAsync();
        var volumesTask = client.CoreV1.ListPersistentVolumeAsync();

        var (deployments, loadBalancers, volumes) = (
            await deploymentsTask,
            await loadBalancersTask,
            await volumesTask);

        var resources = new List<Resource>();

        resources.AddRange(deployments.Items
            .Select(x => new Resource(
                x.Name(),
                ResourceType.Deployment,
                x.Namespace())));

        resources.AddRange(loadBalancers.Items
            .Where(x => x.Spec.Type == "LoadBalancer")
            .Select(x => new Resource(
                x.Name(),
                ResourceType.LoadBalancer,
                x.Namespace())));

        resources.AddRange(volumes.Items
            .Select(x => new Resource(
                x.Name(),
                ResourceType.Volume)));

        return resources;
    }
}
