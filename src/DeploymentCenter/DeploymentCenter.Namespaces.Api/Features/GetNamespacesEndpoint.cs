using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Namespaces.Api.Core;
using DeploymentCenter.Namespaces.Features.GetNamespacesList.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Namespaces.Api.Features;

internal class GetNamespacesEndpoint() : ApiGetEndpointBase(new NamespaceEndpointInfoFactory())
{
    private readonly record struct Namespace(string Name);

    private record GetNamespacesResponse(List<Namespace> Namespaces);

    protected override Delegate Handler => async (
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var namespaces = await mediator.Send(new GetNamespacesListQuery(), cancellationToken);

        return Results.Ok(new GetNamespacesResponse(
            namespaces
                .Select(x => new Namespace(x))
                .ToList()));
    };

}
