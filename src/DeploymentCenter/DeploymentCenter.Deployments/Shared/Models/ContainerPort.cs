namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct ContainerPort(
    int Port,
    int? HostPort);
