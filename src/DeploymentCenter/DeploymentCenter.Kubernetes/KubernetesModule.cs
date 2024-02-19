using k8s;
using Microsoft.Extensions.DependencyInjection;
using KubernetesClient = k8s.Kubernetes;

namespace DeploymentCenter.Kubernetes;

public static class KubernetesModule
{
    public static void AddKubernetesModule(this IServiceCollection services)
    {
        services.AddScoped<IKubernetes>(p => new KubernetesClient(
            KubernetesClientConfiguration.BuildDefaultConfig()));
    }
}
