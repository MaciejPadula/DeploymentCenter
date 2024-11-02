
namespace DeploymentCenter.Metrics.Features.Shared;

public record CurrentMetrics(
    decimal CpuUsage,
    decimal MaxCpuUsage,
    decimal MemoryUsage,
    decimal MaxMemoryUsage);
