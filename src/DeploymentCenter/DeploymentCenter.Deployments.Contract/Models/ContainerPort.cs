namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct ContainerPort(
    int Port,
    int? HostPort);
