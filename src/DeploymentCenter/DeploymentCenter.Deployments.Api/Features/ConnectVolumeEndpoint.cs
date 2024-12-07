using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.ConnectVolume.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class ConnectVolumeEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record ConnectVolumeRequest(string Namespace, string DeploymentName, string VolumeName, string ContainerName, string MountPath);

    protected override Delegate Handler => async (
        [FromBody] ConnectVolumeRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new ConnectVolumeCommand(request.Namespace, request.DeploymentName, request.VolumeName, request.ContainerName, request.MountPath),
            cancellationToken);
    };
}
