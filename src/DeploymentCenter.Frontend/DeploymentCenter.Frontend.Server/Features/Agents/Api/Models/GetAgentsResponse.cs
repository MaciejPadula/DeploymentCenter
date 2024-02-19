using DeploymentCenter.Frontend.Server.Features.Agents.Models;

namespace DeploymentCenter.Frontend.Server.Features.Agents.Api.Models;

public record GetAgentsResponse(
    List<Agent> Agents);
