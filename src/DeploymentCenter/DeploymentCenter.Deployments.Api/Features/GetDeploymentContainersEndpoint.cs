using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Api.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentContainersEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record GetDeploymentContainersResponse(List<Container> Containers);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentContainersQuery(@namespace, deploymentName), cancellationToken);
        return Results.Ok(new GetDeploymentContainersResponse(result
            .Select(container => new Container(
                container.Name,
                container.Image,
                container.Ports
                    .Select(port => new ContainerPort(
                        port.Port,
                        port.HostPort))
                    .ToList(),
                container.EnvironmentVariables
                    .Select(kv => new ContainerEnvironment(kv.Key, kv.Value, kv.ConfigMapName))
                    .ToList()))
            .ToList()));
    };
}
