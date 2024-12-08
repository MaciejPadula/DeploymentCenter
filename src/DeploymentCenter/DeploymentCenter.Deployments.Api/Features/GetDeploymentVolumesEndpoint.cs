using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentVolumesEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record Volume(string Name, string ClaimName);

    internal record GetDeploymentVolumesResponse(List<Volume> volumes);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentVolumesQuery(@namespace, deploymentName), cancellationToken);
        return Results.Ok(new GetDeploymentVolumesResponse(result
            .Select(x => new Volume(x.Name, x.ClaimName))
            .ToList()));
    };
}
