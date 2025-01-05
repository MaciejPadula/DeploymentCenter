namespace DeploymentCenter.Api.Models;

public record Container(
    string Name,
    string Image,
    List<ContainerPort> Ports,
    List<ContainerVolume> Volumes,
    List<ContainerEnvironment> EnvironmentVariables);
