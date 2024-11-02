using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetPodLogs.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetPodLogsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    private record GetPodLogsResponse(string LogText);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string podName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(
            new GetPodLogsQuery(
                @namespace,
                podName),
            cancellationToken);
        return Results.Ok(new GetPodLogsResponse(result));
    };
}
