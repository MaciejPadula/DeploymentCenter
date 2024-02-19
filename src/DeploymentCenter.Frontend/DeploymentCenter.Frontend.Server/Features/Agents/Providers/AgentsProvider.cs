using DeploymentCenter.Frontend.Server.Features.Agents.Models;

namespace DeploymentCenter.Frontend.Server.Features.Agents.Providers;

public interface IAgentsProvider
{
    List<Agent> Provide();
}

internal class AgentsProvider : IAgentsProvider
{
    private readonly IConfiguration _configuration;

    public AgentsProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public List<Agent> Provide() =>
        _configuration.GetValue<List<Agent>>("Agents") ?? [];
}
