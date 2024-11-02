namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;

internal record Pod(
    string Name,
    string Status,
    string Ip);
