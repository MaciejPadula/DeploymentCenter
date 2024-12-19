using DeploymentCenter.Templates.Core.Models;

namespace DeploymentCenter.Templates.Core.Repositories;

internal class DefaultTemplateRepository : ITemplateRepository
{
    private readonly List<ResourceTemplate> _templates;

    public DefaultTemplateRepository()
    {
        var deploy = new Resource(
            "BasicDeploy",
            ResourceType.Deployment,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("ContainerName", "sql-server"),
                new Variable("Image", "mcr.microsoft.com/mssql/server:2022-latest"),
                new Variable("Name", "{appName}-deploy"),
                new Variable("Replicas", "1"),
                new Variable("Port", "1433"),
                new Variable("HostPort", "1433"),
                new Variable("EnvVariables", "MSSQL_SA_PASSWORD:{saPassword},ACCEPT_EULA:Y")
            ]);

        var lb = new Resource(
            "BasicLb",
            ResourceType.LoadBalancer,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("Name", "{appName}-lb"),
                new Variable("Ports", "{port}:1433"),
                new Variable("IpAddresses", "{ipAddress}")
            ]);

        var sqlTemplate = new ResourceTemplate(
            Guid.NewGuid(),
            "sql-server",
            [
                new("appName", "ApplicationName", "sql-server"),
                new("port", "Port", "1433"),
                new("ipAddress", "IpAddress", "172.30.255.251"),
                new("namespace", "Namespace", "default"),
                new("saPassword", "SA Password", "zaq1@WSX")
            ],
            [deploy, lb]);
        _templates = [sqlTemplate];
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
