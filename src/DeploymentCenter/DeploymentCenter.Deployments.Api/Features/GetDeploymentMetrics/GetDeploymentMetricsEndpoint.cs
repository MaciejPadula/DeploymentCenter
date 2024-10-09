using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentMetrics;

internal class GetDeploymentMetricsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "GetDeploymentMetrics";

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
