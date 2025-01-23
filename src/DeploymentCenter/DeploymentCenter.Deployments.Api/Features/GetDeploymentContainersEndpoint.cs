using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentContainersEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record GetDeploymentContainersResponse(List<DeploymentCenter.Api.Models.Container> Containers);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentContainersQuery(@namespace, deploymentName), cancellationToken);
        return Results.Ok(new GetDeploymentContainersResponse(result
            .Select(container => new DeploymentCenter.Api.Models.Container(
                container.Name,
                container.Image,
                container.Ports
                    .Select(port => new DeploymentCenter.Api.Models.ContainerPort(
                        port.Port,
                        port.HostPort))
                    .ToList(),
                container.Volumes
                    .Select(volume => new DeploymentCenter.Api.Models.ContainerVolume(
                        volume.Name,
                        volume.MountPath))
                    .ToList(),
                container.EnvironmentVariables
                    .Select(kv => new DeploymentCenter.Api.Models.ContainerEnvironment(kv.Key, kv.Value, kv.ConfigMapName))
                    .ToList()))
            .ToList()));
    };
}
