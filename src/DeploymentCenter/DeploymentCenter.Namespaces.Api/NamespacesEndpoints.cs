using DeploymentCenter.Api.Framework;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Namespaces.Api;
public static class NamespacesEndpoints
{
    public static void RegisterNamespacesEndpoints(this IServiceCollection services) => services.RegisterEndpoints(typeof(NamespacesEndpoints).Assembly);
}
