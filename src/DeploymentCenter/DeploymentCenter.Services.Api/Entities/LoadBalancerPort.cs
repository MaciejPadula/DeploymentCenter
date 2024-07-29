using DeploymentCenter.Api;

namespace DeploymentCenter.Services.Api.Entities;

public record LoadBalancerPort(
    int HostPort,
    int TargetPort) : IApiEntity;
