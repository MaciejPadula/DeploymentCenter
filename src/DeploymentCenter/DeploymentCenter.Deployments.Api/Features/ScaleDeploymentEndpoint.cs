﻿using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class ScaleDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    private record ScaleDeploymentRequest(string Namespace, string DeploymentName, int ReplicasCount);

    protected override Delegate Handler => async (
        [FromBody] ScaleDeploymentRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new ScaleDeploymentCommand(
                request.Namespace,
                request.DeploymentName,
                request.ReplicasCount),
            cancellationToken);
        return Results.Ok();
    };
}
