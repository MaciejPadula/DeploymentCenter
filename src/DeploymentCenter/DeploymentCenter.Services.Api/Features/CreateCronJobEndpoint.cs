using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.CronJobs.Features.CreateCronJob.Contract;
using DeploymentCenter.Services.Api.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Services.Api.Features;

internal class CreateCronJobEndpoint() : ApiPostEndpointBase(new ServicesEndpointInfoFactory())
{
    internal record CreateCronJobRequest(
        string Namespace,
        string Name,
        string CronExpression,
        List<DeploymentCenter.Api.Models.Container> Containers);

    protected override Delegate Handler => async (
        [FromBody] CreateCronJobRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var command = new CreateCronJobCommand(
            request.Namespace,
            request.Name,
            request.CronExpression,
            request.Containers
                .Select(container => new SharedKernel.Models.Container(
                    container.Name,
                    container.Image,
                    container.Ports
                        .Select(port => new SharedKernel.Models.ContainerPort(
                            port.Port,
                            port.HostPort))
                        .ToList(),
                    [],
                    container.EnvironmentVariables
                        .Select(env => new SharedKernel.Models.EnvironmentVariable(
                            env.Key,
                            env.Value,
                            env.ConfigMapName))
                        .ToList()))
                .ToList());

        var result = await mediator.Send(
            command,
            cancellationToken);

        return ResultsHandler.HandleResult(result, () => Results.Created());
    };
}
