using DeploymentCenter.Deployments.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Deployments;

public static class DeploymentsModule
{
    public static void AddDeploymentsModule(this IServiceCollection services)
    {
        services.AddScoped(_ => KubernetesClientWrapperFactory.Create());
    }
}
