namespace DeploymentCenter.Pods.Core.Models;

public readonly record struct Pod(
    string Name,
    PodStatus Status,
    string Ip);
