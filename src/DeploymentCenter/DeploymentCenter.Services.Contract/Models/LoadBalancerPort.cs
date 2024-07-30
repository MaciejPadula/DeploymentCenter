namespace DeploymentCenter.Services.Contract.Models;

public readonly record struct LoadBalancerPort(
    int Port,
    int TargetPort);
