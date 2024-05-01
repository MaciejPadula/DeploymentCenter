using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetPodLogs;

internal static class GetPodLogsEndpoint
{
    public static void MapGetPodLogsEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet(
            "/api/Deployments/GetPodLogs",
            async (
                [FromQuery] string @namespace,
                [FromQuery] string podName,
                IMediator mediator,
                CancellationToken cancellationToken) =>
            {
                var result = await mediator.Send(new GetPodLogsQuery(
                    @namespace,
                    podName), cancellationToken);
                return Results.Ok(new GetPodLogsResponse(result));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
