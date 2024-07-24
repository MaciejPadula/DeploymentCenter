namespace DeploymentCenter.Deployments.Api.Shared.Models;

internal record ContainerMetrics(
    string ContainerName,
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);