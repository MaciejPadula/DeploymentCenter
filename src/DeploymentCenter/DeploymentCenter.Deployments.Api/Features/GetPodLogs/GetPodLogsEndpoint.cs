using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetPodLogs;

internal class GetPodLogsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "GetPodLogs";

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string podName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetPodLogsQuery(
            @namespace,
            podName), cancellationToken);
        return Results.Ok(new GetPodLogsResponse(result));
    };
}
