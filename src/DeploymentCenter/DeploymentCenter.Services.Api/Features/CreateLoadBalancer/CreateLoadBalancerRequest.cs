using DeploymentCenter.Services.Api.Shared.Models;

namespace DeploymentCenter.Services.Api.Features.CreateLoadBalancer;

internal record CreateLoadBalancerRequest(
    string Namespace,
    string Name,
    string ApplicationName,
    List<LoadBalancerPort> Ports,
    List<string> ExternalIps);