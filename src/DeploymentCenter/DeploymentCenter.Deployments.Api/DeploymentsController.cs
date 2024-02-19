using DeploymentCenter.Api;
using DeploymentCenter.Deployments.Api.Entities;
using DeploymentCenter.Deployments.Api.Responses;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api;

public class DeploymentsController : ApiControllerBase
{
    private readonly IMediator _mediator;

    public DeploymentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetDeploymentsList([FromQuery] string @namespace)
    {
        var deployments = await _mediator.Send(new GetDeploymentsListQuery(@namespace));
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetDeploymentPods(
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName)
    {
        var pods = await _mediator.Send(new GetDeploymentPodsQuery(@namespace, deploymentName));
        return Ok(new GetDeploymentPodsResponse(pods
                .Select(x => new Pod(x.Name, x.Status))
                .ToList()));
    }

    [HttpGet]
    public async Task<IActionResult> GetDeploymentDetails(
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName)
    {
        var details = await _mediator.Send(new GetDeploymentDetailsQuery(@namespace, deploymentName));

        if (!details.HasValue)
        {
            return NotFound();
        }

        return Ok(new GetDeploymentDetailsResponse(
            details.Value.Namespace,
            details.Value.Name,
            details.Value.AliveReplicas,
            details.Value.AllReplicas));
    }
}
