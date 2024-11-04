namespace DeploymentCenter.Services.Api.Core.Models;

internal readonly record struct LoadBalancerPort(
    int HostPort,
    int TargetPort);
