using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features.GetLoadBalancersList;

internal class GetLoadBalancersListEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override string EndpointName => "GetLoadBalancersList";

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
