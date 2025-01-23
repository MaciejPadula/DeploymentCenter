using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Deployments.Api.Core;
using DeploymentCenter.Pods.Features.GetPods.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeploymentCenter.Deployments.Api.Features;

internal class GetPodsEndpoint() : ApiGetEndpointBase(new PodsDefinition())
{
    internal record PodStatus(PodHealth Health, string? Reason, string? Message);

    internal enum PodHealth
    {
        Unknown = 0,
        Waiting = 1,
        Running = 2,
        Terminated = 3,
        Completed = 4
    }

    internal record Pod(
        string Name,
        PodStatus Status,
        string Ip);

    internal record GetPodsResponse(List<Pod> Pods);

    protected override Delegate Handler => async (
        [FromQuery] string @namespace,
        [FromQuery] string namePrefix,
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var result = await mediator.Send(new GetPodsQuery(@namespace, namePrefix), cancellationToken);
        return Results.Ok(new GetPodsResponse(result
            .Select(x => new Pod(x.Name, MapPodStatus(x.Status), x.Ip))
            .ToList()));
    };

    private static PodStatus MapPodStatus(Pods.Core.Models.PodStatus podStatus) =>
        new(MapPodHealth(podStatus.Health), podStatus.Reason, podStatus.Message);

    private static PodHealth MapPodHealth(Pods.Core.Models.PodHealth podHealth) => podHealth switch
    {
        Pods.Core.Models.PodHealth.Unknown => PodHealth.Unknown,
        Pods.Core.Models.PodHealth.Waiting => PodHealth.Waiting,
        Pods.Core.Models.PodHealth.Running => PodHealth.Running,
        Pods.Core.Models.PodHealth.Terminated => PodHealth.Terminated,
        Pods.Core.Models.PodHealth.Completed => PodHealth.Completed,
        _ => throw new NotImplementedException()
    };
}
