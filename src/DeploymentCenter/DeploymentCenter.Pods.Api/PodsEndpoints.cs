using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Pods.Api;

public static class PodsEndpoints
{
    public static void RegisterPodsEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(PodsEndpoints).Assembly);
    }
}
