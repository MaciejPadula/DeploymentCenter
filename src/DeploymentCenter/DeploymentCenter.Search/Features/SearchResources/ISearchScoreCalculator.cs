using DeploymentCenter.Search.Core.Models;

namespace DeploymentCenter.Search.Features.SearchResources;

internal interface ISearchScoreCalculator
{
    ScoreWithResource CalculateScore(string queryPhrase, Resource resource);
    double CalculateGroupScore(IEnumerable<ScoreWithResource> resources);
}
