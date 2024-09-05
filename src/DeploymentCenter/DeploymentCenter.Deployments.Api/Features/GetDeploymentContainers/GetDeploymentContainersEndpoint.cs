using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Api.Shared.Extensions;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentContainers;

internal class GetDeploymentContainersEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "GetDeploymentContainers";

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentContainersQuery(@namespace, deploymentName), cancellationToken);
        return Results.Ok(new GetDeploymentContainersResponse(result.ToDtosList()));
    };
}
