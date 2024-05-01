using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Api.Shared.Extensions;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.CreateDeployment;

internal static class CreateDeploymentEndpoint
{
    public static void MapCreateDeploymentEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost(
            "api/Deployments/CreateDeployment",
            async (
                [FromBody] CreateDeploymentRequest request,
                IMediator mediator) =>
            {
                await mediator.Send(new CreateDeploymentCommand(
                    request.Namespace,
                    request.Name,
                    request.ApplicationName,
                    request.Replicas,
                    request.Containers.ToContractsList()));
            })
            .WithTags(DeploymentsConsts.EndpointGroupTag);
    }
}
