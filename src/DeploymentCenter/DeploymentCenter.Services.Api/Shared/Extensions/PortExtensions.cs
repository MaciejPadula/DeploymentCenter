using DeploymentCenter.Services.Api.Entities;

namespace DeploymentCenter.Services.Api.Shared.Extensions;

internal static class PortExtensions
{
    public static List<Contract.Models.LoadBalancerPort> ToContractsList(this IEnumerable<LoadBalancerPort> ports) =>
        ports.Select(port => port.ToContractModel()).ToList();

    public static Contract.Models.LoadBalancerPort ToContractModel(this LoadBalancerPort port) =>
        new(port.HostPort, port.TargetPort);
}
