namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct EnvironmentVariable(
    string Key,
    string Value,
    string? ConfigMapName);