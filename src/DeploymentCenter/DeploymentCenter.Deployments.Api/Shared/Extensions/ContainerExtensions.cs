using DeploymentCenter.Deployments.Api.Shared.Models;

namespace DeploymentCenter.Deployments.Api.Shared.Extensions;

internal static class ContainerExtensions
{
    public static List<Container> ToDtosList(this IEnumerable<Contract.Models.Container> containers) =>
        containers.ToDtos().ToList();

    public static IEnumerable<Container> ToDtos(this IEnumerable<Contract.Models.Container> containers) =>
        containers.Select(container => container.ToDto());

    public static Container ToDto(this Contract.Models.Container container) =>
        new Container(
            container.Name,
            container.Image,
            container.Ports.ToDtosList(),
            container.EnvironmentVariables
                .Select(kv => new ContainerEnvironment(kv.Key, kv.Value, kv.ConfigMapName))
                .ToList());

    public static List<Contract.Models.Container> ToContractsList(this IEnumerable<Container> containers) =>
        containers.ToContracts().ToList();

    public static IEnumerable<Contract.Models.Container> ToContracts(this IEnumerable<Container> containers) =>
        containers.Select(container => container.ToContract());

    public static Contract.Models.Container ToContract(this Container container) =>
        new Contract.Models.Container(
            container.Name,
            container.Image,
            container.Ports.ToContractsList(),
            container.EnvironmentVariables
                .Select(kv => new Contract.Models.EnvironmentVariable(kv.Key, kv.Value, kv.ConfigMapName))
                .ToList());
}
