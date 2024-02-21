using DeploymentCenter.Deployments.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Deployments.Mappers;

internal static class ContainerMapper
{
    public static List<Container> ToDtos(this IEnumerable<V1Container> containers) =>
        containers
            .Select(ToDto)
            .ToList();

    public static Container ToDto(this V1Container container) =>
        new(container.Name,
            container.Image,
            container.Env.ToDictionary(x => x.Name, x => x.Value));
}
