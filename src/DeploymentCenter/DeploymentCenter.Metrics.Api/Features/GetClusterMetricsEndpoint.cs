using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Metrics.Api.Core;
using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Metrics.Api.Features;

internal class GetClusterMetricsEndpoint() : ApiGetEndpointBase(new MetricsEndpointInfoFactory())
{
    private record GetClusterMetricsResponse(
        decimal CpuUsage,
        decimal MemoryUsage,
        decimal MaxCpuUsage,
        decimal MaxMemoryUsage);

    protected override Delegate Handler => async (
        IMediator mediator) =>
    {
        var result = await mediator.Send(new GetClusterMetricsQuery());

        if (result is null)
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        var response = new GetClusterMetricsResponse(
            result.CpuUsage,
            result.MemoryUsage,
            result.MaxCpuUsage,
            result.MaxMemoryUsage);

        return Results.Ok(response);
    };
}
