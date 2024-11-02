namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct ContainerMetrics(
    string ContainerName,
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);
