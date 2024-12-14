using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;

namespace DeploymentCenter.Deployments.Features.AnalyzeDeployment;

public record DeploymentStatusDetails(
    DeploymentDetails Details,
    List<Pod> Pods,
    List<Container> Containers,
    List<DeploymentVolume> Volumes,
    string UserQuestion);
