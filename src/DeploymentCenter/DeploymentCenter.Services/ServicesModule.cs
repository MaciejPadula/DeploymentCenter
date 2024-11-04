using DeploymentCenter.Services.Core.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Services;

public static class ServicesModule
{
    public static void AddServicesModule(this IServiceCollection services)
    {
        services.AddTransient<IIpAddressParser, IpAddressParser>();
    }
}
