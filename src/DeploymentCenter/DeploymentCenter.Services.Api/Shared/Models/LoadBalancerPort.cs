namespace DeploymentCenter.Services.Api.Shared.Models;

internal readonly record struct LoadBalancerPort(
    int HostPort,
    int TargetPort);
