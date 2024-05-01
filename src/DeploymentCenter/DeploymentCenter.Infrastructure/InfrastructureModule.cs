using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.Infrastructure.Clients;
using k8s;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModule(this IServiceCollection services)
    {
        services.AddScoped<IKubernetes>(_ => new Kubernetes(KubernetesClientConfiguration.BuildDefaultConfig()));
        services.AddTransient<IDeploymentClient, K8sDeploymentClient>();
        return services;
    }
}
