using DeploymentCenter.Api.Framework;
using DeploymentCenter.Security.Api.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Security.Api;

public static class SecurityEndpoints
{
    public static void RegisterSecurityEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(SecurityEndpoints).Assembly);
        services.AddSingleton<IMiddleware, ExceptionHandlingMiddleware>();
    }
}
