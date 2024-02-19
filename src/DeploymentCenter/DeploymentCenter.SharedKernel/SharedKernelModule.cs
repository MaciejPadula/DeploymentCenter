using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.SharedKernel;

public static class SharedKernelModule
{
    public static void AddSharedKernelModule(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));
    }
}
