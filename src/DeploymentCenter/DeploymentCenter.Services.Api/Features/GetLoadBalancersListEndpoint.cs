using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.GetLoadBalancersList.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class GetLoadBalancersListEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    private readonly record struct LoadBalancer(
        string Namespace,
        string Name);

    private record GetLoadBalancersListResponse(List<LoadBalancer> LoadBalancers);


    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var loadBalancers = await mediator.Send(
            new GetLoadBalancersListQuery(@namespace),
            cancellationToken);

        return Results.Ok(new GetLoadBalancersListResponse(
            loadBalancers
                .Select(x => new LoadBalancer(x.Namespace, x.Name))
                .ToList()));
    };
}
