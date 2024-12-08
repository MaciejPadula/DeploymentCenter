using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;

namespace DeploymentCenter.Deployments.Core.Models;

public record DeploymentStatusDetails(
    DeploymentDetails Details,
    List<Pod> Pods,
    List<Container> Containers,
    List<DeploymentVolume> Volumes,
    string UserQuestion);
