using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetClusterMetrics;

internal class GetClusterMetricsHandler(IMetricsClient metricsClient) : IRequestHandler<GetClusterMetricsQuery, CurrentMetrics>
{
    public async Task<CurrentMetrics> Handle(GetClusterMetricsQuery request, CancellationToken cancellationToken)
    {
        var currentUsages = await metricsClient.GetClusterMetrics();
        var currentLimits = await metricsClient.GetClusterLimits();

        return new CurrentMetrics(
            currentUsages.CpuUsage,
            currentLimits.CpuLimit,
            currentUsages.MemoryUsage,
            currentLimits.MemoryLimit);
    }
}
