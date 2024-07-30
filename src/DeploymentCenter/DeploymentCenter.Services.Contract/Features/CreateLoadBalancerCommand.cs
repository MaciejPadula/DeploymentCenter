using DeploymentCenter.Services.Contract.Models;
using MediatR;

namespace DeploymentCenter.Services.Contract.Features;

public record CreateLoadBalancerCommand(
    string Namespace,
    string Name,
    string ApplicationName,
    List<LoadBalancerPort> Ports,
    List<string> ExternalIps) : IRequest;
