namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentMetrics;

internal record GetDeploymentMetricsResponse(
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);