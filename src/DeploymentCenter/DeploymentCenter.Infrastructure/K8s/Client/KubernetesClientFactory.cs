using DeploymentCenter.Infrastructure.Http;
using k8s;
using k8s.KubeConfigModels;

namespace DeploymentCenter.Infrastructure.K8s.Client;

internal class KubernetesClientFactory(IKubeConfigProvider kubeConfigProvider) : IKubernetesClientFactory
{
    public IKubernetes GetClient()
    {
        var kubeConfig = kubeConfigProvider.GetKubeConfig();
        var configObject = KubernetesYaml.Deserialize<K8SConfiguration>(kubeConfig);
        return new Kubernetes(KubernetesClientConfiguration.BuildConfigFromConfigObject(configObject));
    }
}
