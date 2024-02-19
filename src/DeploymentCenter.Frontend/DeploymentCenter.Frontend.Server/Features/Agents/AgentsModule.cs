using DeploymentCenter.Frontend.Server.Features.Agents.Providers;

namespace DeploymentCenter.Frontend.Server.Features.Agents;

public static class AgentsModule
{
    public static IServiceCollection AddAgentsModule(this IServiceCollection services) =>
        services.AddTransient<IAgentsProvider, AgentsProvider>();
}
