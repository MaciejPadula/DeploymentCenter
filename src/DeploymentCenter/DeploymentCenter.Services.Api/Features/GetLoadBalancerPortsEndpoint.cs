using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Api.Core.Models;
using DeploymentCenter.Services.Features.GetLoadBalancerPorts.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class GetLoadBalancerPortsEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    private record GetLoadBalancerPortsResponse(List<LoadBalancerPort> Ports);

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
