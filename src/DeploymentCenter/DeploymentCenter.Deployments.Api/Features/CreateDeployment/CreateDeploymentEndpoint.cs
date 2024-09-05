using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Shared;
using DeploymentCenter.Deployments.Api.Shared.Extensions;
using DeploymentCenter.Deployments.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features.CreateDeployment;

internal class CreateDeploymentEndpoint() : ApiPostEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    protected override string EndpointName => "CreateDeployment";

    protected override Delegate Handler => async (
        [FromBody] CreateDeploymentRequest request,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        await mediator.Send(
            new CreateDeploymentCommand(
                request.Namespace,
                request.Name,
                request.ApplicationName,
                request.Replicas,
                request.Containers.ToContractsList()),
            cancellationToken);
    };
}
