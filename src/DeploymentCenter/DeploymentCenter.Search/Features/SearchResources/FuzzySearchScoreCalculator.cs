using DeploymentCenter.Search.Core.Models;
using FuzzySharp;
using DeploymentCenter.SharedKernel.Extensions;

namespace DeploymentCenter.Search.Features.SearchResources;

internal class FuzzySearchScoreCalculator : ISearchScoreCalculator
{
    public double CalculateGroupScore(IEnumerable<ScoreWithResource> resources)
    {
        return resources.Select(x => x.SearchScore).Median();
    }

    public ScoreWithResource CalculateScore(string queryPhrase, Resource resource)
    {
        return new(
            resource,
            Fuzz.PartialRatio(queryPhrase, resource.Name));
    }
}
