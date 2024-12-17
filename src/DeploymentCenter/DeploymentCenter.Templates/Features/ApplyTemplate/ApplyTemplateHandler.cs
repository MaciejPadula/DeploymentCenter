using DeploymentCenter.SharedKernel;
using DeploymentCenter.Templates.Core.Exceptions;
using DeploymentCenter.Templates.Core.Repositories;
using DeploymentCenter.Templates.Features.ApplyTemplate.Contract;
using DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;
using MediatR;

namespace DeploymentCenter.Templates.Features.ApplyTemplate;

internal class ApplyTemplateHandler(
    IMediator mediator,
    IVariableReplacer variableReplacer,
    IEnumerable<IResourceFactory> resourceFactories,
    ITemplateRepository templateRepository) : IRequestHandler<ApplyTemplateCommand, Result>
{
    public async Task<Result> Handle(ApplyTemplateCommand request, CancellationToken cancellationToken)
    {
        var template = await templateRepository.GetTemplate(request.TemplateName);

        if (template is null)
        {
            return Result.OnError(new TemplateNotFoundException(request.TemplateName));
        }

        foreach (var resource in template.Resources)
        {
            var factory = resourceFactories.FirstOrDefault(h => h.CanCreate(resource.Type));
            if (factory is null)
            {
                continue;
            }
            
            var compiledVariables = variableReplacer.Replace(resource.VariableMap, request.Variables);
            var mediatorRequest = factory.Create(compiledVariables);
            await mediator.Send(mediatorRequest, cancellationToken);
        }

        return Result.OnSuccess();
    }
}
