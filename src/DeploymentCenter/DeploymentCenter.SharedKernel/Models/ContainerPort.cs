namespace DeploymentCenter.SharedKernel.Models;

public readonly record struct ContainerPort(
    int Port,
    int? HostPort);
