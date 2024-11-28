namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct Pod(
    string Name,
    string Phase,
    PodStatus? Status,
    string Ip);
