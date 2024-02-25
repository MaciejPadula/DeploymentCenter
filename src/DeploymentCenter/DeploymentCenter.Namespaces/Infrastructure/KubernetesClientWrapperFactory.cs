using k8s;

namespace DeploymentCenter.Namespaces.Infrastructure;

internal class KubernetesClientWrapperFactory
{
    public static IKubernetesClientWrapper Create() =>
        new KubernetesClientWrapper(new Kubernetes(
                KubernetesClientConfiguration.BuildDefaultConfig()));
}
