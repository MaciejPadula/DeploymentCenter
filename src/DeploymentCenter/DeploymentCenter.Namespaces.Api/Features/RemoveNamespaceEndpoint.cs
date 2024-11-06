using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Namespaces.Api.Core;
using DeploymentCenter.Namespaces.Features.RemoveNamespace.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Namespaces.Api.Features;
internal class RemoveNamespaceEndpoint() : ApiPostEndpointBase(new NamespaceEndpointInfoFactory())
{
    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(new RemoveNamespaceCommand(@namespace), cancellationToken);
    };
}
