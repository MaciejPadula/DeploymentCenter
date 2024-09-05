using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Namespaces.Api.Shared;
using DeploymentCenter.Namespaces.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Namespaces.Api.Features.GetNamespaces;

internal class GetNamespacesEndpoint() : ApiGetEndpointBase(new NamespaceEndpointInfoFactory())
{
    protected override string EndpointName => "GetNamespaces";

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
