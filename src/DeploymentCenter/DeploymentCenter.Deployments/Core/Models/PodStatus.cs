namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct PodStatus(
    string Reason,
    string Message);
