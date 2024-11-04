using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;

public record CreateLoadBalancerCommand(
    string Namespace,
    string Name,
    string ApplicationName,
    List<LoadBalancerPort> Ports,
    List<string> ExternalIps) : IRequest;
