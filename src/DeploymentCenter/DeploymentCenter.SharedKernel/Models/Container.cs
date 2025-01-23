namespace DeploymentCenter.SharedKernel.Models;

public record Container(
    string Name,
    string Image,
    List<ContainerPort> Ports,
    List<ContainerVolume> Volumes,
    List<EnvironmentVariable> EnvironmentVariables);
