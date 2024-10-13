using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class RestartDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "RestartDeployment";

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new RestartDeploymentCommand(@namespace, deploymentName),
            cancellationToken);
        return Results.Ok();
    };
}
