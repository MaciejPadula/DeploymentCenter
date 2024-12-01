using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.AnalyzeDeployment.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class AnalyzeDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record AnalyzeDeploymentRequest(
        string Namespace,
        string DeploymentName,
        string UserQuestion);

    internal record AnalyzeDeploymentResponse(
        string Result);

    protected override Delegate Handler => async (
        [FromBody] AnalyzeDeploymentRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var query = new AnalyzeDeploymentQuery(request.Namespace, request.DeploymentName, request.UserQuestion);
        var result = await mediator.Send(query, cancellationToken);

        if (string.IsNullOrEmpty(result))
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        return Results.Ok(new AnalyzeDeploymentResponse(result));
    };
}
