﻿using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.RemoveDeployment.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class RemoveDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new RemoveDeploymentCommand(@namespace, deploymentName),
            cancellationToken);
        return Results.Ok();
    };
}
