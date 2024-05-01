using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentsList;

internal static class GetDeploymentsListEndpoint
{
    public static void MapGetDeploymentsListEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet(
            "api/Deployments/GetDeploymentsList",
            async (
                [FromQuery] string @namespace,
                IMediator mediator) =>
            {
                var result = await mediator.Send(new GetDeploymentsListQuery(@namespace));
                return Results.Ok(new GetDeploymentsListResponse(result.ToDtosList()));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
