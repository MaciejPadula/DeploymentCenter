using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Api.Shared.Extensions;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features.CreateLoadBalancer;
internal class CreateLoadBalancerEndpoint() : ApiPostEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override string EndpointName => "CreateLoadBalancer";

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
                request.Ports.ToContractsList(),
                request.ExternalIps),
            cancellationToken);
    };
}
