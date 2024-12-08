using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Volumes.Api.Core;
using DeploymentCenter.Volumes.Features.CreateVolume.Contract;
using MediatR;
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
        await mediator.Send(new CreateVolumeCommand(request.VolumeName, request.VolumePath, request.CapacityInKibiBytes), cancellationToken);
    };
}
