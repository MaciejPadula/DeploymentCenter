using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sResourceProvider(IKubernetesClientFactory kubernetesClientFactory) : ISearchQueryExecutor
{
    public async Task<List<Resource>> QueryAllResources()
    {
        using var client = kubernetesClientFactory.GetClient();

        var deploymentsTask = client.AppsV1.ListDeploymentForAllNamespacesAsync();
        var loadBalancersTask = client.CoreV1.ListServiceForAllNamespacesAsync();
        var cronJobsTask = client.BatchV1.ListCronJobForAllNamespacesAsync();

        var (deployments, loadBalancers, cronJobs) = (
            await deploymentsTask,
            await loadBalancersTask,
            await cronJobsTask);

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

        resources.AddRange(cronJobs.Items
            .Select(x => new Resource(
                x.Name(),
                ResourceType.CronJob,
                x.Namespace())));

        return resources;
    }
}
