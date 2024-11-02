namespace DeploymentCenter.Metrics.Features.Shared;

public record CurrentUsage(
    decimal CpuUsage,
    decimal MemoryUsage);
