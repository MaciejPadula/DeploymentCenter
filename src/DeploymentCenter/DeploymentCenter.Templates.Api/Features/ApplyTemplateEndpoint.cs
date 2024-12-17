using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Templates.Api.Core;
using DeploymentCenter.Templates.Core.Exceptions;
using DeploymentCenter.Templates.Features.ApplyTemplate.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Templates.Api.Features;

internal class ApplyTemplateEndpoint() : ApiPostEndpointBase(new TemplatesApiDefinition())
{
    internal record ApplyTemplateRequest(
        string TemplateName,
        Dictionary<string, string> Variables);

    protected override Delegate Handler => async (
        [FromBody] ApplyTemplateRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(
            new ApplyTemplateCommand(request.TemplateName, request.Variables),
            cancellationToken);

        if (result.IsSuccess)
        {
            return Results.Created();
        }

        if (result.Error?.Exception is TemplateNotFoundException exception)
        {
            return Results.NotFound(exception.Message);
        }

        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    };
}
