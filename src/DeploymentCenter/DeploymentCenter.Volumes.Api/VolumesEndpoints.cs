using DeploymentCenter.Api.Framework;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Volumes.Api;

public static class VolumesEndpoints
{
    public static void RegisterVolumesEndpoints(this IServiceCollection services) => services.RegisterEndpoints(typeof(VolumesEndpoints).Assembly);
}
