using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.GetCronJobDetails.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeploymentCenter.Services.Api.Features;
internal class GetCronJobDetailsEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    private record GetCronJobDetailsResponse(
        string Namespace,
        string Name,
        string CronExpression);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string cronJobName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var cronJobDetails = await mediator.Send(new GetCronJobDetailsQuery(@namespace, cronJobName), cancellationToken);

        if (cronJobDetails is null)
        {
            return Results.NotFound();
        }

        var mappedResult = new GetCronJobDetailsResponse(
            cronJobDetails.Namespace,
            cronJobDetails.Name,
            cronJobDetails.CronExpression);

        return Results.Ok(mappedResult);
    };
}
