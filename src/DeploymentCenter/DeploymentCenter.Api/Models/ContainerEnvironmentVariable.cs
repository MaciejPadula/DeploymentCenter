namespace DeploymentCenter.Api.Models;

public record ContainerEnvironment(
    string Key,
    string Value,
    string? ConfigMapName);
