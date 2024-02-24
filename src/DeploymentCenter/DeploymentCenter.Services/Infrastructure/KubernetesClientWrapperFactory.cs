using k8s;

namespace DeploymentCenter.Services.Infrastructure;

internal class KubernetesClientWrapperFactory
{
    public static IKubernetesClientWrapper Create() =>
        new KubernetesClientWrapper(new Kubernetes(
                KubernetesClientConfiguration.BuildDefaultConfig()));
}
