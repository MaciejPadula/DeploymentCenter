using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Templates.Api.Core;
using DeploymentCenter.Templates.Features.GetTemplate.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Templates.Api.Features;

internal class GetTemplateEndpoint() : ApiGetEndpointBase(new TemplatesApiDefinition())
{
    internal record TemplateVariable(string Name, string DisplayName, string DefaultValue);

    internal record ResourceTemplate(
        string Name,
        List<TemplateVariable> Variables);

    internal record GetTemplateResponse(ResourceTemplate Template);

    protected override Delegate Handler => async (
        [FromQuery] string templateName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var response = await mediator.Send(new GetTemplateQuery(templateName), cancellationToken);

        if (response is null)
        {
            return Results.NotFound();
        }

        var mappedResponse = new ResourceTemplate(
            response.Name,
            response.ConfigurableVariables
                .Select(variable => new TemplateVariable(variable.Name, variable.DisplayName, variable.Value))
                .ToList());

        return Results.Ok(new GetTemplateResponse(mappedResponse));
    };
}
