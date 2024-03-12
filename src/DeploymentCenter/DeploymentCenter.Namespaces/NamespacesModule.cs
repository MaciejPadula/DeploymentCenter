using DeploymentCenter.Namespaces.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Namespaces;

public static class NamespacesModule
{
    public static void AddNamespacesModule(this IServiceCollection services)
    {
        services.AddScoped(_ => KubernetesClientWrapperFactory.Create());
    }
}
