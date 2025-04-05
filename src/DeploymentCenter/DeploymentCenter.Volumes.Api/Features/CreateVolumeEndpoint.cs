using DeploymentCenter.Api.Framework;
using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.Volumes.Api.Core;
using DeploymentCenter.Volumes.Features.CreateVolume.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Volumes.Api.Features;

internal class CreateVolumeEndpoint() : ApiPostEndpointBase(new VolumesApiDefinition())
{
    internal record CreateVolumeRequest(string VolumeName, string VolumePath, int CapacityInKibiBytes);

    protected override Delegate Handler => async (
        [FromBody] CreateVolumeRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new CreateVolumeCommand(request.VolumeName, request.VolumePath, request.CapacityInKibiBytes), cancellationToken);
        return ApiResultHandler.HandleResult(result, () => Results.Created());
    };
}
