namespace DeploymentCenter.Deployments.Api.Shared.Models;

internal record ContainerPort(
    int Port,
    int? HostPort);
