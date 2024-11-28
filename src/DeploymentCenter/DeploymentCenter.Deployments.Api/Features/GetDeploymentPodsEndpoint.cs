using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentPodsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record PodStatus(string Reason, string Message);

    internal record Pod(
        string Name,
        string Phase,
        PodStatus? Status,
        string Ip);

    internal record GetDeploymentPodsResponse(List<Pod> Pods);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string deploymentName,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetDeploymentPodsQuery(@namespace, deploymentName), cancellationToken);
        return Results.Ok(new GetDeploymentPodsResponse(result
            .Select(x => new Pod(x.Name, x.Phase, MapPodStatus(x.Status), x.Ip))
            .ToList()));
    };

    private static PodStatus? MapPodStatus(Deployments.Core.Models.PodStatus? podStatus)
    {
        if (podStatus.HasValue)
        {
            return new(podStatus.Value.Reason, podStatus.Value.Message);
        }

        return null;
    }
}
