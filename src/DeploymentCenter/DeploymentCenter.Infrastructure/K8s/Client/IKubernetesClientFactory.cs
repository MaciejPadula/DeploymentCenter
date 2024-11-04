using k8s;

namespace DeploymentCenter.Infrastructure.K8s.Client;

internal interface IKubernetesClientFactory
{
    IKubernetes GetClient();
}