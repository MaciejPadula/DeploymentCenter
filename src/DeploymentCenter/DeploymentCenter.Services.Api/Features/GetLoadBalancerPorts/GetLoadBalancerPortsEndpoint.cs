﻿using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Api.Shared.Models;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features.GetLoadBalancerPorts;

internal class GetLoadBalancerPortsEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override string EndpointName => "GetLoadBalancerPorts";

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var loadBalancerPorts = await mediator.Send(
            new GetLoadBalancerPortsQuery(@namespace, loadBalancerName),
            cancellationToken);

        return Results.Ok(new GetLoadBalancerPortsResponse(
            loadBalancerPorts
                .Select(x => new LoadBalancerPort(
                    x.Port,
                    x.TargetPort))
                .ToList()));
    };
}
