using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentDetails;

internal class GetDeploymentDetailsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "GetDeploymentDetails";

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
