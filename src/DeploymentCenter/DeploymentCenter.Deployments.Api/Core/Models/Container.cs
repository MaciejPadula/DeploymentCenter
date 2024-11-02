namespace DeploymentCenter.Deployments.Api.Core.Models;

internal record Container(
    string Name,
    string Image,
    List<ContainerPort> Ports,
    List<ContainerEnvironment> EnvironmentVariables);
