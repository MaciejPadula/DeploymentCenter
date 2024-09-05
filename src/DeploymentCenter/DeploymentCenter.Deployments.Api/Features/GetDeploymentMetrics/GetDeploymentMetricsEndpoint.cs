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

        return Results.Ok(new GetDeploymentMetricsResponse(
            result.TimestampUtc,
            result.CpuUsage,
            result.MemoryUsage));
    };
}
