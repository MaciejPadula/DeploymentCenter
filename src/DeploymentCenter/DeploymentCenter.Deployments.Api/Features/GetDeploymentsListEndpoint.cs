using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentsList.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentsListEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record Deployment(string Name);

    internal record GetDeploymentsListResponse(List<Deployment> Deployments);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(
            new GetDeploymentsListQuery(@namespace),
            cancellationToken);
        return Results.Ok(new GetDeploymentsListResponse(result
            .Select(x => new Deployment(x.Name))
            .ToList()));
    };
}
