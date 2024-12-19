using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.Templates.Core.Models;
using MediatR;

namespace DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;

internal class LoadBalancerFactory : IResourceFactory
{
    public bool CanCreate(ResourceType type) => type == ResourceType.LoadBalancer;

    public IRequest<Result> Create(Dictionary<string, string> compiledVariables)
    {
        var ips = compiledVariables["IpAddresses"]
            .Split(",")
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .ToList();

        var ports = compiledVariables["Ports"]
            .Split(",")
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Split(":"))
            .Where(x => x.Length == 2)
            .Select(x => new LoadBalancerPort(int.Parse(x[0]), int.Parse(x[1])))
            .ToList();

        var loadBalancerDefinition = new CreateLoadBalancerCommand(
            compiledVariables["Namespace"],
            compiledVariables["Name"],
            compiledVariables["ApplicationName"],
            ports,
            ips);

        return loadBalancerDefinition;
    }
}
