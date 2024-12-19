using DeploymentCenter.Templates.Core.Models;

namespace DeploymentCenter.Templates.Core.Repositories;

internal class DefaultTemplateRepository : ITemplateRepository
{
    private readonly List<ResourceTemplate> _templates;

    public DefaultTemplateRepository()
    {
        _templates =
        [
            TemplateFactory.CreateSimpleWebAppTemplate(),
            TemplateFactory.CreateSqlServerTemplate(),
        ];
    }

    public Task<ResourceTemplate?> GetTemplate(string name)
    {
        return Task.FromResult(_templates.FirstOrDefault(t => t.Name == name));
    }

    public Task<List<TemplateBasicDetails>> GetTemplates()
    {
        var result = _templates
            .Select(t => new TemplateBasicDetails(
                t.Name,
                t.Resources.Select(x => x.Type).ToList()))
            .ToList();
        return Task.FromResult(result);
    }
}
