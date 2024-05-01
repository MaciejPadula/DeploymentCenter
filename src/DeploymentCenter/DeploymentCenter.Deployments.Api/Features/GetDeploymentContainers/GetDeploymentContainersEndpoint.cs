using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Api.Shared.Extensions;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentContainers;

internal static class GetDeploymentContainersEndpoint
{
    public static void MapGetDeploymentContainersEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet(
            "api/Deployments/GetDeploymentContainers",
            async (
                [FromQuery] string @namespace,
                [FromQuery] string deploymentName,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetDeploymentContainersQuery(@namespace, deploymentName));
                return Results.Ok(new GetDeploymentContainersResponse(result.ToDtosList()));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
