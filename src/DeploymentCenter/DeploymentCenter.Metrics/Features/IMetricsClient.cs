using DeploymentCenter.Metrics.Features.Shared;

namespace DeploymentCenter.Metrics.Features;

public interface IMetricsClient
{
    Task<bool> AreMetricsAvailable();
    Task<CurrentLimit> GetClusterLimits();
    Task<CurrentUsage> GetClusterMetrics();
    Task<CurrentUsage> GetDeploymentMetrics(string @namespace, string deploymentName);
    Task<Dictionary<string, CurrentUsage>> GetPodsMetrics(string @namespace, string? podPrefix);
}
