using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.RemovePod.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;
internal class RemovePodEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string podName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new RemovePodCommand(@namespace, podName),
            cancellationToken);
        return Results.Ok();
    };
}