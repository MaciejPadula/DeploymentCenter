namespace DeploymentCenter.Deployments.Infrastructure;

public readonly record struct ContainerMetrics(
    string ContainerName,
    DateTime TimestampUtc,
    decimal CpuUsage,
    decimal MemoryUsage);
