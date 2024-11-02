namespace DeploymentCenter.Metrics.Features.Shared;

public record CurrentLimit(
    decimal CpuLimit,
    decimal MemoryLimit);