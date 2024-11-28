using DeploymentCenter.Deployments.Core.Models;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Mappers;

internal interface IK8sPodMapper
{
    Pod Map(V1Pod pod);
}

internal class K8sPodMapper : IK8sPodMapper
{
    public Pod Map(V1Pod pod) => new(
        pod.Metadata.Name,
        ParsePodStatus(pod.Status.ContainerStatuses?.LastOrDefault()?.State),
        pod.Status.PodIP);

    private static PodStatus ParsePodStatus(V1ContainerState? state)
    {
        if (state?.Running is not null)
        {
            return new PodStatus(PodHealth.Running);
        }

        if (state?.Waiting is not null)
        {
            return new PodStatus(
                PodHealth.Waiting,
                state.Waiting.Reason,
                state.Waiting.Message);
        }

        if (state?.Terminated is not null)
        {
            return new PodStatus(
                PodHealth.Terminated,
                state.Terminated.Reason,
                state.Terminated.Reason);
        }

        return new PodStatus(PodHealth.Unknown);
    }
}
