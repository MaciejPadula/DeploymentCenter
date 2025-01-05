using DeploymentCenter.Services.Core.Models;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Mappers;

internal interface IK8sServiceMapper
{
    LoadBalancerBasicInfo Map(V1Service service);
    LoadBalancerDetails MapDetails(V1Service service);
    V1Service Map(LoadBalancer loadBalancer);
    V1CronJob Map(CronJob cronJob);
    CronJobBasicInfo Map(V1CronJob service);
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

    public V1CronJob Map(CronJob cronJob) =>
        new()
        {
            Metadata = new()
            {
                Name = cronJob.Name,
                NamespaceProperty = cronJob.Namespace
            },
            Spec = new()
            {
                Schedule = cronJob.CronExpression,
                JobTemplate = new()
                {
                    Spec = new()
                    {
                        Template = new()
                        {
                            Spec = new()
                            {
                                RestartPolicy = "Never",
                                Containers = cronJob.Containers.Select(c => new V1Container
                                {
                                    Name = c.Name,
                                    Image = c.Image,
                                    Env = c.EnvironmentVariables.Select(e => new V1EnvVar
                                    {
                                        Name = e.Key,
                                        Value = e.Value,
                                        ValueFrom = !string.IsNullOrEmpty(e.ConfigMapName)
                                            ? new V1EnvVarSource
                                            {
                                                ConfigMapKeyRef = new V1ConfigMapKeySelector
                                                {
                                                    Name = e.ConfigMapName,
                                                    Key = e.Key
                                                }
                                            }
                                            : null
                                    }).ToList()
                                }).ToList()
                            }
                        }
                    }
                },
            }
        };

    public CronJobBasicInfo Map(V1CronJob service) =>
        new(service.Metadata.NamespaceProperty, service.Metadata.Name, service.Spec.Schedule);

    public LoadBalancerDetails MapDetails(V1Service service) =>
        new(service.Metadata.NamespaceProperty,
            service.Metadata.Name,
            service.Spec.Selector.TryGetValue(
                K8sConsts.ApplicationNameDictionaryKey, out var applicationName) ? applicationName : string.Empty);
}
