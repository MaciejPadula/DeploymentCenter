using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.SharedKernel;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.Clients;

internal class K8sServiceClient : IServiceClient
{
    private readonly IKubernetes _kubernetes;

    public K8sServiceClient(IKubernetes kubernetes)
    {
        _kubernetes = kubernetes;
    }

    public async Task CreateLoadBalancer(LoadBalancer loadBalancer)
    {
        await _kubernetes.CoreV1.CreateNamespacedServiceAsync(new()
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
}
