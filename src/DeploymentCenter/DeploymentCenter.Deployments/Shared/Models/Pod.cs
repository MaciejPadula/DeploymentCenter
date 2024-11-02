namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct Pod(
    string Name,
    string Status,
    string Ip);
