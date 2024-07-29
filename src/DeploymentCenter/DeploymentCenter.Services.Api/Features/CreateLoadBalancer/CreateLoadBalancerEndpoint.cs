using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Api.Shared.Extensions;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Services.Api.Features.CreateLoadBalancer;
internal static class CreateLoadBalancerEndpoint
{
    public static void MapCreateLoadBalancerEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost(
            "api/Services/CreateLoadBalancer",
            async (
                [FromBody] CreateLoadBalancerRequest request,
                IMediator mediator) =>
            {
                await mediator.Send(new CreateLoadBalancerCommand(
                    request.Namespace,
                    request.Name,
                    request.ApplicationName,
                    request.Ports.ToContractsList(),
                    request.ExternalIps));
            })
            .WithTags(ServicesConsts.EndpointGroupTag);
    }
}
