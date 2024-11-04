using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.RemoveLoadBalancer.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class RemoveLoadBalancerEndpoint() : ApiPostEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new RemoveLoadBalancerCommand(@namespace, loadBalancerName),
            cancellationToken);
    };
}
