using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Core.Repositories;
using DeploymentCenter.Templates.Features.GetTemplate.Contract;
using MediatR;

namespace DeploymentCenter.Templates.Features.GetTemplate;

internal class GetTemplateHandler(ITemplateRepository templateRepository) : IRequestHandler<GetTemplateQuery, ResourceTemplate?>
{
    public async Task<ResourceTemplate?> Handle(GetTemplateQuery request, CancellationToken cancellationToken)
    {
        return await templateRepository.GetTemplate(request.Name);
    }
}
