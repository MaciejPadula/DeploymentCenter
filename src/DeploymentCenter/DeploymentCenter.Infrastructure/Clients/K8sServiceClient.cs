using DeploymentCenter.Infrastructure.Extensions;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.SharedKernel;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.Clients;

internal class K8sServiceClient(IKubernetes kubernetes) : IServiceClient
{
    private const string LoadBalancerKey = "LoadBalancer";

    public async Task CreateLoadBalancer(LoadBalancer loadBalancer)
    {
        await kubernetes.CoreV1.CreateNamespacedServiceAsync(new()
        {
            Metadata = new()
            {
                Name = loadBalancer.Name,
                NamespaceProperty = loadBalancer.Namespace
            },
            Spec = new()
            {
                Type = "LoadBalancer",
                Selector = new Dictionary<string, string>()
                {
                    { Consts.ApplicationNameDictionaryKey, loadBalancer.ApplicationName }
                },
                Ports = loadBalancer.Ports.Select(p => new V1ServicePort
                {
                    Port = p.Port,
                    TargetPort = p.TargetPort
                }).ToList(),
                ExternalIPs = loadBalancer.ExternalIps
            }
        }, loadBalancer.Namespace);
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
            .Select(x => x.ToLBDetails())
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
            .ToLBBasicInfo()
            .ToList();
    }

    private async Task<IEnumerable<V1Service>> GetLoadBalancers(string @namespace, string? loadBalancerName = null)
    {
        var services = await kubernetes.CoreV1.ListNamespacedServiceAsync(@namespace);

        return services.Items
            .Where(x => x.Spec.Type == LoadBalancerKey && (string.IsNullOrEmpty(loadBalancerName) || x.Metadata.Name == loadBalancerName));
    }
}
