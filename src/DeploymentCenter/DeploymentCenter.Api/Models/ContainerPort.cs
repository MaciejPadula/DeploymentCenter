namespace DeploymentCenter.Api.Models;

public record ContainerPort(
    int Port,
    int? HostPort);
