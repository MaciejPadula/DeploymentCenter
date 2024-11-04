using k8s;

namespace DeploymentCenter.Infrastructure.K8s.Client;

internal class DebugKubernetesClientFactory : IKubernetesClientFactory
{
    public IKubernetes GetClient() => new Kubernetes(KubernetesClientConfiguration.BuildDefaultConfig());
}
