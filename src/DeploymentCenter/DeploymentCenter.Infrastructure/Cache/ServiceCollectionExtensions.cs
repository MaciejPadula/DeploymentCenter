using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Infrastructure.Cache;

internal static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCached<TInterface>(
        this IServiceCollection services,
        Func<IServiceProvider, TInterface> implementationFactory,
        Func<IServiceProvider, IMemoryCache, TInterface, TInterface> cachedFactory) where TInterface : class
    {
        services.AddTransient(provider => 
            cachedFactory(
                provider,
                provider.GetRequiredService<IMemoryCache>(),
                implementationFactory(provider)));

        return services;
    }
}
