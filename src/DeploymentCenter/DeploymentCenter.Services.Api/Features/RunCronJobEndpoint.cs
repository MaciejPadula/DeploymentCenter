using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Services.Api.Core;
using DeploymentCenter.Services.Features.RunCronJob.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class RunCronJobEndpoint() : ApiPostEndpointBase(new ServicesEndpointInfoFactory())
{
    internal record RunCronJobRequest(string Namespace, string CronJobName);

    protected override Delegate Handler => async (
        [FromBody] RunCronJobRequest request,
        IMediator mediator) =>
    {
        var command = new RunCronJobCommand(
                       request.Namespace,
                                  request.CronJobName);

        var result = await mediator.Send(command);

        return ResultsHandler.HandleResult(result, () => Results.Created());
    };
}
