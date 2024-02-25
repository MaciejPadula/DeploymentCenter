using DeploymentCenter.Api;
using DeploymentCenter.Namespaces.Api.Entities;
using DeploymentCenter.Namespaces.Api.Responses;
using DeploymentCenter.Namespaces.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Namespaces.Api;

public class NamespacesController : ApiControllerBase
{
    private readonly IMediator _mediator;

    public NamespacesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetNamespaces()
    {
        var namespaces = await _mediator.Send(new GetNamespacesListQuery());

        return Ok(new GetNamespacesResponse(
            namespaces
                .Select(x => new Namespace(x))
                .ToList()));
    }
}
