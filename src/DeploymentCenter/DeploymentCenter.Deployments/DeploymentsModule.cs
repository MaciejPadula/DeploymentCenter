using DeploymentCenter.Deployments.Core.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Deployments;

public static class DeploymentsModule
{
    public static void AddDeploymentsModule(this IServiceCollection services)
    {
        services.AddTransient<IReplicasCountValidator, ReplicasCountValidator>();
    }
}
