using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Search.Api.Core;
using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Search.Api.Features;

internal class SearchResourcesEndpoint() : ApiGetEndpointBase(new SearchApiDefinition())
{
    internal enum SearchResourceType
    {
        Unknown = 0,
        Deployment = 1,
        LoadBalancer = 2,
        CronJob = 3,
    }

    internal record Resource(string Name, string Namespace, SearchResourceType Type);

    internal record SearchResourcesResponse(Dictionary<string, List<Resource>> Resources);

    protected override Delegate Handler => async (
        [FromQuery] string query,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new SearchResourcesQuery(query), cancellationToken);
        var mappedResult = result
        .ToDictionary(
            x => x.Key,
            x => x.Value
                .Select(x => new Resource(x.Name, x.Namespace, MapType(x.Type)))
                .ToList());
        return Results.Ok(new SearchResourcesResponse(mappedResult));
    };

    private static SearchResourceType MapType(ResourceType resourceType) => resourceType switch
    {
        ResourceType.Deployment => SearchResourceType.Deployment,
        ResourceType.LoadBalancer => SearchResourceType.LoadBalancer,
        ResourceType.CronJob => SearchResourceType.CronJob,
        _ => SearchResourceType.Unknown,
    };
}
