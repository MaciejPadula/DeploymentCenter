﻿using DeploymentCenter.Api.Framework;
using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using DeploymentCenter.SharedKernel.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class CreateDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record CreateDeploymentRequest(
        string Namespace,
        string Name,
        string ApplicationName,
        int Replicas,
        List<DeploymentCenter.Api.Models.Container> Containers);

    protected override Delegate Handler => async (
        [FromBody] CreateDeploymentRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var createCommand = new CreateDeploymentCommand(
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
                        [],
                        container.EnvironmentVariables
                            .Select(env => new EnvironmentVariable(
                                env.Key,
                                env.Value,
                                env.ConfigMapName))
                            .ToList()))
                    .ToList());

        var result = await mediator.Send(
            createCommand,
            cancellationToken);

        return ApiResultHandler.HandleResult(result, () => Results.Created());
    };
}
