namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct ContainerPort(
    int Port,
    int? HostPort);
