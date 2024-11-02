namespace DeploymentCenter.Deployments.Api.Core.Models;

internal record ContainerPort(
    int Port,
    int? HostPort);
