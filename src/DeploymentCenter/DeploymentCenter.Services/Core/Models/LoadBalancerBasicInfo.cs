namespace DeploymentCenter.Services.Core.Models;

public readonly record struct LoadBalancerBasicInfo(
    string Namespace,
    string Name);