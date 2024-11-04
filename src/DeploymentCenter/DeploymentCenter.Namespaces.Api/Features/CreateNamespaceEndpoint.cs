using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Namespaces.Api.Core;
using DeploymentCenter.Namespaces.Features.CreateNamespace.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Namespaces.Api.Features;

internal class CreateNamespaceEndpoint() : ApiPostEndpointBase(new NamespaceEndpointInfoFactory())
{
    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(new CreateNamespaceCommand(@namespace), cancellationToken);
    };
}
