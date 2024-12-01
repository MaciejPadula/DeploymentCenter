namespace DeploymentCenter.Deployments.Core.Models;

public record DeploymentStatusDetails(
    string DeploymentName,
    Dictionary<string, PodStatus> PodsStatuses,
    string UserAdditionalDetails);
