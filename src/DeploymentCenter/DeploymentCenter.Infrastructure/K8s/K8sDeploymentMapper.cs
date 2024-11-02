using DeploymentCenter.Deployments.Shared.Models;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s;

internal interface IK8sDeploymentMapper
{
    V1Deployment Map(Deployment deployment);
    DeploymentBasicInfo MapBasicInfo(V1Deployment deployment);
    Container MapContainer(V1Container container);
    IEnumerable<Deployments.Shared.Models.ContainerMetrics> MapMetrics(PodMetrics podMetrics);
}

internal class K8sDeploymentMapper : IK8sDeploymentMapper
{
    public V1Deployment Map(Deployment deployment) =>
        new()
        {
            Metadata = new()
            {
                Name = deployment.Name,
                NamespaceProperty = deployment.Namespace
            },
            Spec = new()
            {
                Replicas = deployment.Replicas,
                Selector = new()
                {
                    MatchLabels = new Dictionary<string, string>()
                    {
                        { K8sConsts.ApplicationNameDictionaryKey, deployment.ApplicationName }
                    }
                },
                Template = new()
                {
                    Metadata = new()
                    {
                        Labels = new Dictionary<string, string>()
                        {
                            { K8sConsts.ApplicationNameDictionaryKey, deployment.ApplicationName }
                        }
                    },
                    Spec = new()
                    {
                        Containers = deployment.Containers.Select(c => new V1Container
                        {
                            Name = c.Name,
                            Image = c.Image,
                            Env = c.EnvironmentVariables.Select(env => new V1EnvVar
                            {
                                Name = env.Key,
                                Value = string.IsNullOrEmpty(env.ConfigMapName) ? env.Value : null,
                                ValueFrom = !string.IsNullOrEmpty(env.ConfigMapName) ? new V1EnvVarSource
                                {
                                    ConfigMapKeyRef = new V1ConfigMapKeySelector
                                    {
                                        Name = env.ConfigMapName,
                                        Key = env.Key
                                    }
                                } : null
                            }).ToList(),
                            Ports = c.Ports.Select(p => new V1ContainerPort
                            {
                                ContainerPort = p.Port,
                                HostPort = p.HostPort
                            }).ToList()
                        }).ToList()
                    }
                }
            }
        };

    public DeploymentBasicInfo MapBasicInfo(V1Deployment deployment) => new(deployment.Metadata.Name);

    public Container MapContainer(V1Container container) =>
        new(
            container.Name,
            container.Image,
            container
                .Ports?
                .Select(x => new ContainerPort(x.ContainerPort, x.HostPort))?
                .ToList() ?? [],
            container.Env?
                .Select(x => new EnvironmentVariable(x.Name, x.Value, x.ValueFrom?.ConfigMapKeyRef?.Name))?
                .ToList() ?? []);

    public IEnumerable<Deployments.Shared.Models.ContainerMetrics> MapMetrics(PodMetrics podMetrics) =>
        podMetrics.Containers
            .Select(c =>
                new Deployments.Shared.Models.ContainerMetrics(
                    c.Name,
                    podMetrics.Timestamp.GetValueOrDefault(),
                    c.Usage["cpu"],
                    c.Usage["memory"]));
}
