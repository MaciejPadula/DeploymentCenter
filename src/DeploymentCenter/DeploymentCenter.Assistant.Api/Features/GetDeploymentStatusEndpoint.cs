using DeploymentCenter.AIChat.Core.Exceptions;
using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Assistant.Api.Core;
using DeploymentCenter.Assistant.Features.GetDeploymentStatus.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Assistant.Api.Features;

internal class GetDeploymentStatusEndpoint() : ApiPostEndpointBase(new ApiDefinition())
{
    internal record GetDeploymentStatusRequest(
        string Namespace,
        string DeploymentName);

    internal record GetDeploymentStatusResponse(
        string Result);

    protected override Delegate Handler => async (
        [FromBody] GetDeploymentStatusRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var query = new GetDeploymentStatusQuery(request.Namespace, request.DeploymentName);
        var result = await mediator.Send(query, cancellationToken);

        if (result.IsSuccess && result.Value is not null)
        {
            return Results.Ok(new GetDeploymentStatusResponse(result.Value));
        }

        if (result.Error?.Exception is AIClientNotInitializedException)
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    };
}
