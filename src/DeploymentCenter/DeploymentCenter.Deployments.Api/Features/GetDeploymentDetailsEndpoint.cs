using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentDetailsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    private record GetDeploymentDetailsResponse(
        string Namespace,
        string DeploymentName,
        string ApplicationName,
        int AliveReplicas,
        int AllReplicas);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var details = await mediator.Send(new GetDeploymentDetailsQuery(@namespace, deploymentName), cancellationToken);

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
    };
}
