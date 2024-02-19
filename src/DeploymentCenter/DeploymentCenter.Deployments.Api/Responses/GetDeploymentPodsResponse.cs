using DeploymentCenter.Api;
using DeploymentCenter.Deployments.Api.Entities;

namespace DeploymentCenter.Deployments.Api.Responses;

public record GetDeploymentPodsResponse(
    List<Pod> Pods) : IApiResponse;
