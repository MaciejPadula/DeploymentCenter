using DeploymentCenter.Deployments.Contract.Models;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Deployments.Infrastructure;

internal interface IKubernetesClientWrapper
{
    Task<V1Deployment?> GetDeployment(string @namespace, string deploymentName);
    Task<V1DeploymentList> GetDeployments(string @namespace);
    Task<V1PodList> GetPods(string @namespace);
    Task<V1PodList> GetDeploymentPods(string @namespace, string deploymentName);
    Task<List<V1Container>> GetDeploymentContainers(string @namespace, string deploymentName);
}

internal class KubernetesClientWrapper : IKubernetesClientWrapper
{
    private readonly IKubernetes _kubernetes;

    public KubernetesClientWrapper(IKubernetes kubernetes)
    {
        _kubernetes = kubernetes;
    }

    public async Task<V1Deployment?> GetDeployment(string @namespace, string deploymentName)
    {
        var deploys = await GetDeployments(@namespace);
        return deploys
            .Items
            .FirstOrDefault(d => d.Metadata.Name == deploymentName);
    }

    public async Task<List<V1Container>> GetDeploymentContainers(string @namespace, string deploymentName)
    {
        var deploy = await GetDeployment(@namespace, deploymentName);
        return deploy?
            .Spec?
            .Template?
            .Spec?
            .Containers?
            .ToList() ?? [];
    }

    public async Task<V1PodList> GetDeploymentPods(string @namespace, string deploymentName)
    {
        var pods = await GetPods(@namespace);
        pods.Items = pods.Items
            .Where(p => p.Metadata.Name.StartsWith(deploymentName))
            .ToList();
        return pods;
    }

    public Task<V1DeploymentList> GetDeployments(string @namespace) =>
        _kubernetes.AppsV1.ListNamespacedDeploymentAsync(@namespace);

    public Task<V1PodList> GetPods(string @namespace) =>
        _kubernetes.CoreV1.ListNamespacedPodAsync(@namespace);
}
