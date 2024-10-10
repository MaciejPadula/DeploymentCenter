using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Security.Api;

public static class SecurityEndpoints
{
    public static void RegisterSecurityEndpoints(this IServiceCollection services) => services.RegisterEndpoints(typeof(SecurityEndpoints).Assembly);
}
