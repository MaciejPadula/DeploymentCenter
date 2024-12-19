using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Templates.Api.Core;
using DeploymentCenter.Templates.Api.Core.Models;
using DeploymentCenter.Templates.Features.GetTemplates.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Templates.Api.Features;

internal class GetTemplatesEndpoint() : ApiGetEndpointBase(new TemplatesApiDefinition())
{
    internal record TemplateDetails(string Name, List<ResourceType> ResourceTypes);
    
    internal record GetTemplatesResponse(List<TemplateDetails> Templates);

    protected override Delegate Handler => async(
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var response = await mediator.Send(new GetTemplatesQuery(), cancellationToken);
        var mappedResponse = response
            .Select(template => new TemplateDetails(
                template.Name,
                template.ResourceTypes
                    .Select(resourceType => (ResourceType)resourceType)
                    .ToList()))
            .ToList();

        return Results.Ok(mappedResponse);
    };
}
