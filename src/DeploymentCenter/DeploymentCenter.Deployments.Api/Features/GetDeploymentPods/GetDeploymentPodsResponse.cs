using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;

internal record GetDeploymentPodsResponse(List<Pod> Pods) : IApiResponse;
