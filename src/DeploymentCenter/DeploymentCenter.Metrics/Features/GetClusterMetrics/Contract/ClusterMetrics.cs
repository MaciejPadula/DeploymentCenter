namespace DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;

public record ClusterMetrics(
    decimal CpuUsage,
    decimal MemoryUsage,
    decimal MaxCpuUsage,
    decimal MaxMemoryUsage);
