﻿using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Api.Shared.Models;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentMetrics;

internal static class GetDeploymentMetricsEndpoint
{
    public static void MapGetDeploymentMetricsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet(
            "api/Deployments/GetDeploymentMetrics",
            async (
                [FromQuery] string @namespace,
                [FromQuery] string deploymentName,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetDeploymentMetricsQuery(@namespace, deploymentName));

                var metrics = result
                    .Select(c => new ContainerMetrics(
                        c.ContainerName,
                        c.TimestampUtc,
                        c.CpuUsage,
                        c.MemoryUsage))
                    .ToList();

                return Results.Ok(new GetDeploymentMetricsResponse(metrics));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
