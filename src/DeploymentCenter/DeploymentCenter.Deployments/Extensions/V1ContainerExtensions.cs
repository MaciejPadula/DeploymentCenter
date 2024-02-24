using DeploymentCenter.Deployments.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Deployments.Extensions;

internal static class V1ContainerExtensions
{
    public static IEnumerable<Container> ToDtos(this IEnumerable<V1Container> containers) =>
        containers.Select(ToDto);

    public static Container ToDto(this V1Container container) =>
        new(container.Name,
            container.Image,
            container.Env.ToDictionary(x => x.Name, x => x.Value));
}
