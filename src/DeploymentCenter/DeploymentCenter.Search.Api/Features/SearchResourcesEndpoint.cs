using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Search.Api.Core;
using DeploymentCenter.Search.Features.SearchResources.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Search.Api.Features;

internal class SearchResourcesEndpoint() : ApiGetEndpointBase(new SearchApiDefinition())
{
    internal record Resource(string Name, string? Namespace, int Type);

    internal record SearchResourcesResponse(List<Resource> Resources);

    protected override Delegate Handler => async (
        [FromQuery] string query,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new SearchResourcesQuery(query), cancellationToken);
        var mappedResult = result.Select(x => new Resource(x.Name, x.Namespace, (int)x.Type)).ToList();
        return Results.Ok(new SearchResourcesResponse(mappedResult));
    };
}
