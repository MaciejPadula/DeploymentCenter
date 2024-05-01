using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;

internal static class GetDeploymentPodsEndpoint
{
    public static void MapGetDeploymentPodsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet(
            "api/Deployments/GetDeploymentPods",
            async (
                [FromQuery] string @namespace,
                [FromQuery] string deploymentName,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetDeploymentPodsQuery(@namespace, deploymentName));
                return Results.Ok(new GetDeploymentPodsResponse(result.ToDtosList()));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
