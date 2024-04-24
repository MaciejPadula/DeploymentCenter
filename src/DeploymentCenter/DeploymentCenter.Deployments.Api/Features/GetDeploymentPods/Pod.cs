using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;

internal record Pod(
    string Name,
    string Status,
    string Ip,
    bool IsRunning) : IApiEntity;
