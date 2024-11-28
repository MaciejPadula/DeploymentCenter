using DeploymentCenter.Infrastructure.Http;
using k8s;
using k8s.KubeConfigModels;
using Microsoft.Extensions.Logging;

namespace DeploymentCenter.Infrastructure.K8s.Client;

internal class KubernetesClientFactory(
    IKubeConfigProvider kubeConfigProvider,
    ILogger<KubernetesClientFactory> logger) : IKubernetesClientFactory
{
    public IKubernetes GetClient()
    {
        try
        {
            var kubeConfig = kubeConfigProvider.GetKubeConfig();
            var configObject = KubernetesYaml.Deserialize<K8SConfiguration>(kubeConfig);
            return new Kubernetes(KubernetesClientConfiguration.BuildConfigFromConfigObject(configObject));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to create Kubernetes client");
            throw new UnauthorizedAccessException();
        }
    }
}
