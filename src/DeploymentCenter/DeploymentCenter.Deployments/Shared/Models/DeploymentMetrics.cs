namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct DeploymentMetrics(
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);