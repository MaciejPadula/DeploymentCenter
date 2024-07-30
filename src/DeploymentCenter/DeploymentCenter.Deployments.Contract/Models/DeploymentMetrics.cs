namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct DeploymentMetrics(
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);