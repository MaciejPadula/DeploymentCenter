namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct ContainerMetrics(
    string ContainerName,
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);
