namespace DeploymentCenter.Deployments.Api.Shared.Models;

internal record ContainerEnvironment(
    string Key,
    string Value,
    string? ConfigMapName);
