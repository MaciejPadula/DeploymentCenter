using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentDetails;

internal static class GetDeploymentDetailsEndpoint
{
    public static void MapGetDeploymentDetailsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet(
            "api/Deployments/GetDeploymentDetails",
            async (
                [FromQuery] string @namespace,
                [FromQuery] string deploymentName,
                IMediator mediator) =>
            {
                var details = await mediator.Send(new GetDeploymentDetailsQuery(@namespace, deploymentName));

                if (!details.HasValue)
                {
                    return Results.NotFound();
                }

                return Results.Ok(new GetDeploymentDetailsResponse(
                    details.Value.Namespace,
                    details.Value.Name,
                    details.Value.ApplicationName,
                    details.Value.AliveReplicas,
                    details.Value.AllReplicas));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
