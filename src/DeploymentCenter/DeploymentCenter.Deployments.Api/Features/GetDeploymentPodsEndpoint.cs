using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetDeploymentPodsEndpoint() : ApiGetEndpointBase(new DeploymentsEndpointsInfoFactory())
{
    internal record PodStatus(PodHealth Health, string? Reason, string? Message);

    internal enum PodHealth
    {
        Unknown = 0,
        Waiting = 1,
        Running = 2,
        Terminated = 3
    }

    internal record Pod(
        string Name,
        PodStatus Status,
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
            .Select(x => new Pod(x.Name, MapPodStatus(x.Status), x.Ip))
            .ToList()));
    };

    private static PodStatus MapPodStatus(Deployments.Core.Models.PodStatus podStatus) =>
        new(MapPodHealth(podStatus.Health), podStatus.Reason, podStatus.Message);

    private static PodHealth MapPodHealth(Deployments.Core.Models.PodHealth podHealth) => podHealth switch
    {
        Deployments.Core.Models.PodHealth.Unknown => PodHealth.Unknown,
        Deployments.Core.Models.PodHealth.Waiting => PodHealth.Waiting,
        Deployments.Core.Models.PodHealth.Running => PodHealth.Running,
        Deployments.Core.Models.PodHealth.Terminated => PodHealth.Terminated,
        _ => throw new NotImplementedException()
    };
}
