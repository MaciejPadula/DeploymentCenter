using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentMetrics.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentMetricsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    private record GetDeploymentMetricsResponse(
        DateTime TimestampUtc,
        decimal CpuUsage,
        decimal MemoryUsage);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentMetricsQuery(@namespace, deploymentName), cancellationToken);

        if (!result.HasValue)
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        return Results.Ok(new GetDeploymentMetricsResponse(
            result.Value.TimestampUtc,
            result.Value.CpuUsage,
            result.Value.MemoryUsage));
    };
}
