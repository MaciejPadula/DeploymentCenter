using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Metrics.Features.GetDeploymentMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using DeploymentCenter.SharedKernel.Extensions;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentMetrics;

internal class GetDeploymentMetricsHandler(IMetricsClient metricsClient) : IRequestHandler<GetDeploymentMetricsQuery, CurrentUsage>
{
    public async Task<CurrentUsage> Handle(GetDeploymentMetricsQuery request, CancellationToken cancellationToken)
    {
        return await metricsClient.GetDeploymentMetrics(request.Namespace, request.DeploymentName);
    }
}
