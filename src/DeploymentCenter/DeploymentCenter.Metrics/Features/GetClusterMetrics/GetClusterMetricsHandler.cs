using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetClusterMetrics;

internal class GetClusterMetricsHandler(IMetricsClient metricsClient) : IRequestHandler<GetClusterMetricsQuery, ClusterMetrics>
{
    public async Task<ClusterMetrics> Handle(GetClusterMetricsQuery request, CancellationToken cancellationToken)
    {
        return await metricsClient.GetClusterMetrics();
    }
}
