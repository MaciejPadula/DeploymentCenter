﻿using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Api.Core.Models;
using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.SetEnvironmentVariables.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class SetEnvironmentVariablesEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record SetEnvironmentVariablesRequest(
        string Namespace,
        string DeploymentName,
        string ContainerName,
        List<ContainerEnvironment> EnvironmentVariables);

    protected override Delegate Handler => async (
        [FromBody] SetEnvironmentVariablesRequest request,
        IMediator mediator) =>
    {
        var command = new SetEnvironmentVariablesCommand(
            request.Namespace,
            request.DeploymentName,
            request.ContainerName,
            request.EnvironmentVariables
                .Select(x => new EnvironmentVariable(x.Key, x.Value, x.ConfigMapName))
                .ToList());

        await mediator.Send(command);
    };
}