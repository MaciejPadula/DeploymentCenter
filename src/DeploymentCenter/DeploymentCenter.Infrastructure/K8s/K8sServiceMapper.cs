using DeploymentCenter.Services.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s;

internal interface IK8sServiceMapper
{
    LoadBalancerBasicInfo Map(V1Service service);
    LoadBalancerDetails MapDetails(V1Service service);
    V1Service Map(LoadBalancer loadBalancer);
}

internal class K8sServiceMapper : IK8sServiceMapper
{
    public LoadBalancerBasicInfo Map(V1Service service) =>
        new(service.Metadata.NamespaceProperty,
            service.Metadata.Name);

    public V1Service Map(LoadBalancer loadBalancer) =>
        new()
        {
            Metadata = new()
            {
                Name = loadBalancer.Name,
                NamespaceProperty = loadBalancer.Namespace
            },
            Spec = new()
            {
                Type = K8sConsts.LoadBalancerType,
                Selector = new Dictionary<string, string>()
                {
                    { K8sConsts.ApplicationNameDictionaryKey, loadBalancer.ApplicationName }
                },
                Ports = loadBalancer.Ports.Select(p => new V1ServicePort
                {
                    Port = p.Port,
                    TargetPort = p.TargetPort
                }).ToList(),
                ExternalIPs = loadBalancer.ExternalIps
            }
        };

    public LoadBalancerDetails MapDetails(V1Service service) =>
        new(service.Metadata.NamespaceProperty,
            service.Metadata.Name,
            service.Spec.Selector.TryGetValue(
                K8sConsts.ApplicationNameDictionaryKey, out var applicationName) ? applicationName : string.Empty);
}
