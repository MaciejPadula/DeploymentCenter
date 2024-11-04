using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.GetLoadBalancerIpAddresses.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;
internal class GetLoadBalancerIpAddressesEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    private record GetLoadBalancerIpAddressesResponse(List<string> IpAddresses);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var loadBalancerIpAddresses = await mediator.Send(
            new GetLoadBalancerIpAddressesQuery(@namespace, loadBalancerName),
            cancellationToken);

        return Results.Ok(new GetLoadBalancerIpAddressesResponse(
            loadBalancerIpAddresses
                .Select(x => x.ToString())
                .ToList()));
    };
}
