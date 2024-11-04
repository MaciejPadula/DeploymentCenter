using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class CreateDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    private record CreateDeploymentRequest(
        string Namespace,
        string Name,
        string ApplicationName,
        int Replicas,
        List<Core.Models.Container> Containers);

    protected override Delegate Handler => async (
        [FromBody] CreateDeploymentRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new CreateDeploymentCommand(
                request.Namespace,
                request.Name,
                request.ApplicationName,
                request.Replicas,
                request.Containers
                    .Select(container => new Container(
                        container.Name,
                        container.Image,
                        container.Ports
                            .Select(port => new ContainerPort(
                                port.Port,
                                port.HostPort))
                            .ToList(),
                        container.EnvironmentVariables
                            .Select(env => new EnvironmentVariable(
                                env.Key,
                                env.Value,
                                env.ConfigMapName))
                            .ToList()))
                    .ToList()),
            cancellationToken);
    };
}
