﻿using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Metrics.Api.Core;
using DeploymentCenter.Metrics.Features.GetDeploymentMetrics.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentMetricsEndpoint() : ApiGetEndpointBase(new MetricsEndpointInfoFactory())
{
    private record GetDeploymentMetricsResponse(
        decimal CpuUsage,
        decimal MemoryUsage);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(
            new GetDeploymentMetricsQuery(@namespace, deploymentName),
            cancellationToken);

        if (result is null)
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        return Results.Ok(new GetDeploymentMetricsResponse(
            result.CpuUsage,
            result.MemoryUsage));
    };
}
