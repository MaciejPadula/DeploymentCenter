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
        pod.Status.Phase,
        ParsePodStatus(pod.Status.ContainerStatuses.LastOrDefault()?.State),
        pod.Status.PodIP);

    private static PodStatus? ParsePodStatus(V1ContainerState? state)
    {
        if (state?.Waiting is not null)
        {
            return new(
                state.Waiting.Reason,
                state.Waiting.Message);
        }

        if (state?.Terminated is not null)
        {
            return new(
                state.Terminated.Reason,
                state.Terminated.Reason);
        }

        return null;
    }
}
