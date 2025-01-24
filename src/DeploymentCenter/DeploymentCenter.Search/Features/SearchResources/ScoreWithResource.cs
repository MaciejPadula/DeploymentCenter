using DeploymentCenter.Search.Core.Models;

namespace DeploymentCenter.Search.Features.SearchResources;

internal record ScoreWithResource(
    Resource Resource,
    int SearchScore);
