using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.GetLoadBalancerDetails.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class GetLoadBalancerDetailsEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    private readonly record struct GetLoadBalancerDetailsResponse(
        string Namespace,
        string LoadBalancerName,
        string ApplicationName);


    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string loadBalancerName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var loadBalancerDetails = await mediator.Send(
            new GetLoadBalancerDetailsQuery(@namespace, loadBalancerName),
            cancellationToken);

        if (loadBalancerDetails is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(new GetLoadBalancerDetailsResponse(
            loadBalancerDetails.Namespace,
            loadBalancerDetails.Name,
            loadBalancerDetails.ApplicationName));
    };
}
