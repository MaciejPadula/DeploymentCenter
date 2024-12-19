using DeploymentCenter.Templates.Core.Models;

namespace DeploymentCenter.Templates.Core.Repositories;

public interface ITemplateRepository
{
    Task<ResourceTemplate?> GetTemplate(string name);
    Task<List<TemplateBasicDetails>> GetTemplates();
}
