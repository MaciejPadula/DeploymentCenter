namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct EnvironmentVariable(
    string Key,
    string Value,
    string? ConfigMapName);