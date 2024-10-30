using DeploymentCenter.Api.Framework;
using DeploymentCenter.Deployments.Api.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Deployments.Api;

public static class DeploymentsEndpoints
{
    public static void RegisterDeploymentsEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(DeploymentsEndpoints).Assembly);
        services.AddSingleton<IMiddleware, ExceptionHandlingMiddleware>();
    }
}
