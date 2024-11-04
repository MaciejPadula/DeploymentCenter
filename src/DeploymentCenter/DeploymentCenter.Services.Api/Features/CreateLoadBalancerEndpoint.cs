using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Api.Core.Models;
using DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;
internal class CreateLoadBalancerEndpoint() : ApiPostEndpointBase(new ServicesEndpointInfoFactory())
{
    private record CreateLoadBalancerRequest(
        string Namespace,
        string Name,
        string ApplicationName,
        List<LoadBalancerPort> Ports,
        List<string> ExternalIps);

    protected override Delegate Handler => async (
        [FromBody] CreateLoadBalancerRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new CreateLoadBalancerCommand(
                request.Namespace,
                request.Name,
                request.ApplicationName,
                request.Ports
                    .Select(x => new Services.Core.Models.LoadBalancerPort(x.HostPort, x.TargetPort))
                    .ToList(),
                request.ExternalIps),
            cancellationToken);
    };
}
