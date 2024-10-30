using DeploymentCenter.Deployments.Shared;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Deployments;

public static class DeploymentsModule
{
    public static void AddDeploymentsModule(this IServiceCollection services)
    {
        services.AddTransient<IReplicasCountValidator, ReplicasCountValidator>();
    }
}
