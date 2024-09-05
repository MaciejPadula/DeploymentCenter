using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Deployments.Api;

public static class DeploymentsEndpoints
{
    public static void RegisterDeploymentsEndpoints(this IServiceCollection services) => services.RegisterEndpoints(typeof(DeploymentsEndpoints).Assembly);
}
