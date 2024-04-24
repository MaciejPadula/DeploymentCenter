namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;

internal static class PodExtensions
{
    public static List<Pod> ToDtosList(this IEnumerable<Contract.Models.Pod> pods) =>
        pods.ToDtos().ToList();

    public static IEnumerable<Pod> ToDtos(this IEnumerable<Contract.Models.Pod> pods) =>
        pods.Select(pod => pod.ToDto());

    public static Pod ToDto(this Contract.Models.Pod pod) =>
        new Pod(
            pod.Name,
            pod.Status,
            pod.Ip,
            pod.IsRunning);
}
