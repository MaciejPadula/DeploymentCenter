namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct PodStatus(
    PodHealth Health,
    string? Reason = null,
    string? Message = null);
