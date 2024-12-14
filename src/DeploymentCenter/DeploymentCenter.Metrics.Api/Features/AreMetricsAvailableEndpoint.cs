using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Metrics.Api.Core;
using DeploymentCenter.Metrics.Features.AreMetricsAvailable.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Metrics.Api.Features;

internal class AreMetricsAvailableEndpoint() : ApiGetEndpointBase(new MetricsEndpointInfoFactory())
{
    internal enum MetricsAvailability
    {
        Available = 0,
        Unavailable = 1
    }

    internal record AreMetricsAvailableResponse(MetricsAvailability Status);

    protected override Delegate Handler => async (
        IMediator mediator) =>
    {
        var result = await mediator.Send(new AreMetricsAvailableQuery());

        if (result)
        {
            return Results.Ok(new AreMetricsAvailableResponse(MetricsAvailability.Available));
        }

        return Results.Ok(new AreMetricsAvailableResponse(MetricsAvailability.Unavailable));
    };
}
