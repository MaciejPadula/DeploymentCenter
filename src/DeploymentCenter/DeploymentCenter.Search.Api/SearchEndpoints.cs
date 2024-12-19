using Microsoft.Extensions.DependencyInjection;
using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Search.Api;

public static class SearchEndpoints
{
    public static void RegisterSearchEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(SearchEndpoints).Assembly);
    }
}
