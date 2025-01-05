using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.GetCronJobsList.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class GetCronJobsListEndpoint() : ApiGetEndpointBase(new ServicesEndpointInfoFactory())
{
    internal readonly record struct GetCronJobsListResponse(
        string Namespace,
        string CronJobName,
        string CronExpression);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var cronJobsList = await mediator.Send(new GetCronJobsListQuery(@namespace), cancellationToken);

        var mappedResult = cronJobsList
            .Select(cronJob => new GetCronJobsListResponse(cronJob.Namespace, cronJob.Name, cronJob.CronExpression))
            .ToList();

        return Results.Ok(mappedResult);
    };
}

