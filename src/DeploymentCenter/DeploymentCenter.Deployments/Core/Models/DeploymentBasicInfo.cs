namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct DeploymentBasicInfo(
    string Name,
    DeploymentStatus Status);
