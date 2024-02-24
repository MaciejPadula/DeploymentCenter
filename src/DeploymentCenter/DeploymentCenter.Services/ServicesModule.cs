using DeploymentCenter.Services.Helpers;
using DeploymentCenter.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Services;

public static class ServicesModule
{
    public static void AddServicesModule(this IServiceCollection services)
    {
        services.AddTransient<IIpAddressParser, IpAddressParser>();
        services.AddScoped(_ => KubernetesClientWrapperFactory.Create());
    }
}
