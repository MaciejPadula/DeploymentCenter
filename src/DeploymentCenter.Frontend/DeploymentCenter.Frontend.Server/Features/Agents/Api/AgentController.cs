using DeploymentCenter.Frontend.Server.Features.Agents.Api.Models;
using DeploymentCenter.Frontend.Server.Features.Agents.Providers;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Frontend.Server.Features.Agents.Api;

[ApiController]
[Route("api/[controller]/[action]")]
public class AgentController : Controller
{
    private readonly IAgentsProvider _agentsProvider;

    public AgentController(IAgentsProvider agentsProvider)
    {
        _agentsProvider = agentsProvider;
    }

    [HttpGet]
    public GetAgentsResponse GetAgents() =>
        new(_agentsProvider.Provide());
}
