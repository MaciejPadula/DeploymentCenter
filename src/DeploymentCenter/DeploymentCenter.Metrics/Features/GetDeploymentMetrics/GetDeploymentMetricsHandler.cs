using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Metrics.Features.GetDeploymentMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentMetrics;

internal class GetDeploymentMetricsHandler(IMetricsClient metricsClient) : IRequestHandler<GetDeploymentMetricsQuery, CurrentUsage>
{
    private const int CpuMinutesRatio = 1000;

    public async Task<CurrentUsage> Handle(GetDeploymentMetricsQuery request, CancellationToken cancellationToken)
    {
        var result = await metricsClient.GetDeploymentMetrics(request.Namespace, request.DeploymentName);
        return result with
        {
            CpuUsage = result.CpuUsage * CpuMinutesRatio
        };
    }
}
