using DeploymentCenter.Deployments.Api.Shared.Models;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentMetrics;

internal record GetDeploymentMetricsResponse(
    List<ContainerMetrics> Metrics);