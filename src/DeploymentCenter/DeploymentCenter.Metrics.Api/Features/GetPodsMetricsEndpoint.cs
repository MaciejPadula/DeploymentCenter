using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Metrics.Api.Core;
using DeploymentCenter.Metrics.Features.GetPodsMetrics.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Metrics.Api.Features;

internal class GetPodsMetricsEndpoint() : ApiGetEndpointBase(new MetricsEndpointInfoFactory())
{
    internal record Usage(
        decimal CpuUsage,
        decimal MemoryUsage);

    internal record GetPodsMetricsResponse(
        Dictionary<string, Usage> Usages);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string? podPrefix,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(
            new GetPodsMetricsQuery(@namespace, podPrefix),
            cancellationToken);

        var mappedResult = result
            .ToDictionary(
                kvp => kvp.Key,
                kvp => new Usage(
                    kvp.Value.CpuUsage,
                    kvp.Value.MemoryUsage));

        return Results.Ok(new GetPodsMetricsResponse(mappedResult));
    };
}
