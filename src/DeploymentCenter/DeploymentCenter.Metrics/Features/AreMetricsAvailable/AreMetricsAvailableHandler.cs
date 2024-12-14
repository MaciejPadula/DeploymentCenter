using DeploymentCenter.Metrics.Features.AreMetricsAvailable.Contract;
using MediatR;

namespace DeploymentCenter.Metrics.Features.AreMetricsAvailable;

internal class AreMetricsAvailableHandler(IMetricsClient metricsClient) : IRequestHandler<AreMetricsAvailableQuery, bool>
{
    public async Task<bool> Handle(AreMetricsAvailableQuery request, CancellationToken cancellationToken)
    {
        return await metricsClient.AreMetricsAvailable();
    }
}
