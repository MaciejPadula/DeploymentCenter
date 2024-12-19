using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Search.Api.Core;

internal class SearchApiDefinition : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => "Search";

    public string GetEndpointPath(string endpointName) => $"api/Search/{endpointName}";
}
