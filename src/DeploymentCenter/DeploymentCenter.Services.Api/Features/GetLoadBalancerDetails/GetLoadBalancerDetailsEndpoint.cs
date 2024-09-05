using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Shared;
using DeploymentCenter.Services.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features.GetLoadBalancerDetails;

internal class GetLoadBalancerDetailsEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    protected override string EndpointName => "GetLoadBalancerDetails";

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
