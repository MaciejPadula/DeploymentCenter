namespace DeploymentCenter.Deployments.Api.Shared.Models;

internal record Container(
    string Name,
    string Image,
    List<ContainerPort> Ports,
    List<ContainerEnvironment> EnvironmentVariables);
