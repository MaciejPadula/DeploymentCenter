using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Templates.Api;

public static class TemplatesEndpoints
{
    public static void RegisterTemplatesEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(TemplatesEndpoints).Assembly);
    }
}
