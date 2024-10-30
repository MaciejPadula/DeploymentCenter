using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;

namespace DeploymentCenter.Metrics.Features.Shared;

public interface IMetricsClient
{
    Task<ClusterMetrics> GetClusterMetrics();
}
