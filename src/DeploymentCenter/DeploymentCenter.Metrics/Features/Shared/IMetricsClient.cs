namespace DeploymentCenter.Metrics.Features.Shared;

public interface IMetricsClient
{
    Task<CurrentLimit> GetClusterLimits();
    Task<CurrentUsage> GetClusterMetrics();
}
