namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct Pod(
    string Name,
    string Status);
