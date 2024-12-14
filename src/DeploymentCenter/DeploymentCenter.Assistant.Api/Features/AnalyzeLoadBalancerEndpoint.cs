using DeploymentCenter.AIChat.Core.Exceptions;
using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Assistant.Api.Core;
using DeploymentCenter.Services.Features.AnalyzeLoadBalancer.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class AnalyzeLoadBalancerEndpoint() : ApiPostEndpointBase(new ApiDefinition())
{
    internal record AnalyzeLoadBalancerRequest(
        string Namespace,
        string LoadBalancerName,
        string UserQuestion);

    internal record AnalyzeLoadBalancerResponse(
        string Result);

    protected override Delegate Handler => async (
        [FromBody] AnalyzeLoadBalancerRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var query = new AnalyzeLoadBalancerQuery(request.Namespace, request.LoadBalancerName, request.UserQuestion);
        var result = await mediator.Send(query, cancellationToken);

        if (result.IsSuccess && result.Value is not null)
        {
            return Results.Ok(new AnalyzeLoadBalancerResponse(result.Value));
        }

        if (result.Error?.Exception is AIClientNotInitializedException)
        {
            return Results.StatusCode(StatusCodes.Status501NotImplemented);
        }

        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    };
}
