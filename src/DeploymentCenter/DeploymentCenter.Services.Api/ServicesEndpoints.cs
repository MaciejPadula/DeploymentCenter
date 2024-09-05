using DeploymentCenter.Api.Framework;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Services.Api;

public static class ServicesEndpoints
{
    public static void RegisterServicesEndpoints(this IServiceCollection services) => services.RegisterEndpoints(typeof(ServicesEndpoints).Assembly);
}
