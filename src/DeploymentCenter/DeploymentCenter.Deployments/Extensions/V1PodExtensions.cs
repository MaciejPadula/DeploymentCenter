using DeploymentCenter.Deployments.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Deployments.Extensions;

internal static class V1PodExtensions
{
    public static IEnumerable<Pod> ToDtos(this IEnumerable<V1Pod> podList) =>
        podList.Select(pod => pod.ToDto());

    public static Pod ToDto(this V1Pod pod) =>
        new(pod.Metadata.Name,
            pod.Status.Phase,
            pod.Status.PodIP,
            !pod.Status.ContainerStatuses.Any(c => !c.Ready));
}
