namespace DeploymentCenter.Services.Core.Models;

public readonly record struct LoadBalancerPort(
    int Port,
    int TargetPort);
