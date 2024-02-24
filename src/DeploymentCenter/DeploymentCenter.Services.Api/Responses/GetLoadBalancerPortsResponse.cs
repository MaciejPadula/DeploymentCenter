using DeploymentCenter.Api;
using DeploymentCenter.Services.Api.Entities;

namespace DeploymentCenter.Services.Api.Responses;

public record GetLoadBalancerPortsResponse(
    List<LoadBalancerPort> Ports) : IApiResponse;
