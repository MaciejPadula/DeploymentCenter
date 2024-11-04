using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Infrastructure.K8s.Mappers;
using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sServiceClient(
    IKubernetesClientFactory kubernetesClientFactory,
    IK8sServiceMapper serviceMapper) : IServiceClient
{
    private const string LoadBalancerKey = "LoadBalancer";

    public async Task CreateLoadBalancer(LoadBalancer loadBalancer)
    {
        using var client = kubernetesClientFactory.GetClient();
        await client.CoreV1.CreateNamespacedServiceAsync(
            serviceMapper.Map(loadBalancer),
            loadBalancer.Namespace);
    }

    public async Task<List<string>> GetLoadBalancerIpAddresses(string @namespace, string loadBalancerName)
    {
        var services = await GetLoadBalancers(@namespace, loadBalancerName);

        return services
            .SelectMany(x => x.Spec.ExternalIPs)
            .ToList();
    }

    public async Task<LoadBalancerDetails?> GetLoadBalancerDetails(string @namespace, string loadBalancerName)
    {
        var services = await GetLoadBalancers(@namespace, loadBalancerName);

        return services
            .Select(serviceMapper.MapDetails)
            .FirstOrDefault();
    }

    public async Task<List<LoadBalancerPort>> GetLoadBalancerPorts(string @namespace, string loadBalancerName)
    {
        var services = await GetLoadBalancers(@namespace, loadBalancerName);

        return services
            .SelectMany(x => x.Spec.Ports)
            .Select(x => new LoadBalancerPort(x.Port, int.Parse(x.TargetPort.Value)))
            .ToList();
    }

    public async Task<List<LoadBalancerBasicInfo>> GetLoadBalancersBasicInfos(string @namespace)
    {
        var services = await GetLoadBalancers(@namespace);
        return services
            .Select(serviceMapper.Map)
            .ToList();
    }

    public async Task RemoveLoadBalancer(string @namespace, string name)
    {
        using var client = kubernetesClientFactory.GetClient();
        var loadBalancer = await GetLoadBalancerDetails(@namespace, name) ?? throw new Exception("Lb not found");
        await client.CoreV1.DeleteNamespacedServiceAsync(loadBalancer.Name, loadBalancer.Namespace);
    }

    private async Task<IEnumerable<V1Service>> GetLoadBalancers(string @namespace, string? loadBalancerName = null)
    {
        using var client = kubernetesClientFactory.GetClient();
        var services = await client.CoreV1.ListNamespacedServiceAsync(@namespace);

        return services.Items
            .Where(x => x.Spec.Type == LoadBalancerKey && (string.IsNullOrEmpty(loadBalancerName) || x.Metadata.Name == loadBalancerName));
    }
}
