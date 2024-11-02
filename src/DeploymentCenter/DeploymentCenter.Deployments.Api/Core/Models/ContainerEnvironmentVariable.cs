namespace DeploymentCenter.Deployments.Api.Core.Models;

internal record ContainerEnvironment(
    string Key,
    string Value,
    string? ConfigMapName);
