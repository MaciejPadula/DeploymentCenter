using DeploymentCenter.Deployments.Api.Shared.Models;

namespace DeploymentCenter.Deployments.Api.Shared.Extensions;

internal static class ContainerPortExtensions
{
    public static List<ContainerPort> ToDtosList(this List<Contract.Models.ContainerPort> ports) =>
        ports.ToDtos().ToList();

    public static IEnumerable<ContainerPort> ToDtos(this IEnumerable<Contract.Models.ContainerPort> ports) =>
        ports.Select(ToDto);

    public static ContainerPort ToDto(this Contract.Models.ContainerPort port) =>
        new ContainerPort(
            port.Port,
            port.HostPort);

    public static List<Contract.Models.ContainerPort> ToContractsList(this List<ContainerPort> ports) =>
        ports.ToContracts().ToList();

    public static IEnumerable<Contract.Models.ContainerPort> ToContracts(this IEnumerable<ContainerPort> ports) =>
        ports.Select(ToContract);

    public static Contract.Models.ContainerPort ToContract(this ContainerPort port) =>
        new Contract.Models.ContainerPort(
            port.Port,
            port.HostPort);
}
