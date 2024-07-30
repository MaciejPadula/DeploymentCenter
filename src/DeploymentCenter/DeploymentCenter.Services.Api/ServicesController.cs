using DeploymentCenter.Api;
using DeploymentCenter.Services.Api.Entities;
using DeploymentCenter.Services.Api.Responses;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api;

public class ServicesController : ApiControllerBase
{
    private readonly IMediator _mediator;

    public ServicesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetLoadBalancersList(
        [FromQuery] string @namespace)
    {
        var loadBalancers = await _mediator.Send(new GetLoadBalancersListQuery(@namespace));

        return Ok(new GetLoadBalancersListResponse(
            loadBalancers
                .Select(x => new LoadBalancer(x.Namespace, x.Name))
                .ToList()));
    }

    [HttpGet]
    public async Task<IActionResult> GetLoadBalancerDetails(
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName)
    {
        var loadBalancerDetails = await _mediator.Send(new GetLoadBalancerDetailsQuery(@namespace, loadBalancerName));

        if (loadBalancerDetails is null)
        {
            return NotFound();
        }

        return Ok(new GetLoadBalancerDetailsResponse(
            loadBalancerDetails.Namespace,
            loadBalancerDetails.Name,
            loadBalancerDetails.ApplicationName));
    }

    [HttpGet]
    public async Task<IActionResult> GetLoadBalancerIpAddresses(
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName)
    {
        var loadBalancerIpAddresses = await _mediator.Send(new GetLoadBalancerIpAddressesQuery(@namespace, loadBalancerName));

        return Ok(new GetLoadBalancerIpAddressesResponse(
            loadBalancerIpAddresses
                .Select(x => x.ToString())
                .ToList()));
    }

    [HttpGet]
    public async Task<IActionResult> GetLoadBalancerPorts(
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName)
    {
        var loadBalancerPorts = await _mediator.Send(new GetLoadBalancerPortsQuery(@namespace, loadBalancerName));

        return Ok(new GetLoadBalancerPortsResponse(
            loadBalancerPorts
                .Select(x => new LoadBalancerPort(
                    x.Port,
                    x.TargetPort))
                .ToList()));
    }
}
