using DeploymentCenter.Services.Api.Shared.Models;

namespace DeploymentCenter.Services.Api.Features.GetLoadBalancerPorts;

internal record GetLoadBalancerPortsResponse(List<LoadBalancerPort> Ports);
