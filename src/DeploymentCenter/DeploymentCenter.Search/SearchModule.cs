using DeploymentCenter.Search.Features.SearchResources;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Search;

public static class SearchModule
{
    public static void AddSearchModule(this IServiceCollection services)
    {
        services.AddTransient<ISearchScoreCalculator, FuzzySearchScoreCalculator>();
    }
}
