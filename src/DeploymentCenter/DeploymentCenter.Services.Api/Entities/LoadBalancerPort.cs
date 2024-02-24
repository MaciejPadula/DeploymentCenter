using DeploymentCenter.Api;

namespace DeploymentCenter.Services.Api.Entities;

public record LoadBalancerPort(
    string Protocol,
    int HostPort,
    string TargetPort) : IApiEntity;
