namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct ContainerMetrics(
    string ContainerName,
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);
