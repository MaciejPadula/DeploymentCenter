using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources.Contract;
using FuzzySharp;
using MediatR;

namespace DeploymentCenter.Search.Features.SearchResources;

internal class SearchResourcesHandler(
    ISearchQueryExecutor searchQueryExecutor,
    ISearchScoreCalculator searchScoreCalculator) : IRequestHandler<SearchResourcesQuery, Dictionary<string, List<Resource>>>
{
    private const int MinimumFuzzyMatchRatio = 80;

    public async Task<Dictionary<string, List<Resource>>> Handle(SearchResourcesQuery request, CancellationToken cancellationToken)
    {
        var resources = await searchQueryExecutor.QueryAllResources();
        return resources
            .Select(x => searchScoreCalculator.CalculateScore(request.QueryPhrase, x))
            .Where(x => x.SearchScore >= MinimumFuzzyMatchRatio)
            .OrderByDescending(x => x.SearchScore)
            .ThenBy(x => x.Resource.Type)
            .ThenBy(x => x.Resource.Name)
            .GroupBy(x => x.Resource.Namespace)
            .OrderByDescending(searchScoreCalculator.CalculateGroupScore)
            .ToDictionary(x => x.Key, x => x.Select(a => a.Resource).ToList());
    }
}
