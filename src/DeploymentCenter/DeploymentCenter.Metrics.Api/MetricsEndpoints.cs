using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Metrics.Api;

public static class MetricsEndpoints
{
    public static void RegisterMetricsEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(MetricsEndpoints).Assembly);
    }
}
