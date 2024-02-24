namespace DeploymentCenter.Services.Contract.Models;

public readonly record struct LoadBalancerBasicInfo(
    string Namespace,
    string Name);