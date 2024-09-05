using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features.GetLoadBalancerIpAddresses;
internal class GetLoadBalancerIpAddressesEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override string EndpointName => "GetLoadBalancerIpAddresses";

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
