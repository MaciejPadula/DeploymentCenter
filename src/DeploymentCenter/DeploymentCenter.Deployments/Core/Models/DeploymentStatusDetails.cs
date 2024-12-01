namespace DeploymentCenter.Deployments.Core.Models;

public record DeploymentStatusDetails(
    DeploymentDetails Details,
    List<Pod> Pods,
    List<Container> Containers,
    string UserQuestion);
