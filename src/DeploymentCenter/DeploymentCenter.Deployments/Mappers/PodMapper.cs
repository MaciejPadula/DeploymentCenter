using DeploymentCenter.Deployments.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Deployments.Mappers;

internal static class PodMapper
{
    public static List<Pod> ToDtos(this V1PodList podList) =>
        podList.Items
            .Select(pod => pod.ToDto())
            .ToList();

    public static Pod ToDto(this V1Pod pod) =>
        new(pod.Metadata.Name, pod.Status.Phase);
}
