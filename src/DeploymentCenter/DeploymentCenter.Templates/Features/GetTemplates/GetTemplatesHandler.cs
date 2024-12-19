using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Core.Repositories;
using DeploymentCenter.Templates.Features.GetTemplates.Contract;
using MediatR;

namespace DeploymentCenter.Templates.Features.GetTemplates;

internal class GetTemplatesHandler(ITemplateRepository templateRepository) : IRequestHandler<GetTemplatesQuery, List<TemplateBasicDetails>>
{
    public async Task<List<TemplateBasicDetails>> Handle(GetTemplatesQuery request, CancellationToken cancellationToken)
    {
        return await templateRepository.GetTemplates();
    }
}
