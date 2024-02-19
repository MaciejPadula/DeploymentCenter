using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Api;

[Route("api/[controller]/[action]")]
[ApiController]
public abstract class ApiControllerBase : ControllerBase
{
}
