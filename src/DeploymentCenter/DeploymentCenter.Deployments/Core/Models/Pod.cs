namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct Pod(
    string Name,
    PodStatus Status,
    string Ip);
