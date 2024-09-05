using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentsList;

internal class GetDeploymentsListEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "GetDeploymentsList";

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentsListQuery(@namespace), cancellationToken);
        return Results.Ok(new GetDeploymentsListResponse(result.ToDtosList()));
    };
}
