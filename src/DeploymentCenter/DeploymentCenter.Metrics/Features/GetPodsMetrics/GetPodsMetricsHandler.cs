using DeploymentCenter.Metrics.Features.GetPodsMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetPodsMetrics;

internal class GetPodsMetricsHandler(IMetricsClient metricsClient) : IRequestHandler<GetPodsMetricsQuery, Dictionary<string, CurrentUsage>>
{
    private const int CpuMinutesRatio = 1000;

    public async Task<Dictionary<string, CurrentUsage>> Handle(GetPodsMetricsQuery request, CancellationToken cancellationToken)
    {
        var result = await metricsClient.GetPodsMetrics(request.Namespace, request.PodPrefix);

        return result.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value with
            {
                CpuUsage = kvp.Value.CpuUsage * CpuMinutesRatio
            });
    }
}
