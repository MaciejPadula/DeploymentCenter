using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.SharedKernel.Extensions;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentMetricsHandler(IDeploymentClient deploymentClient, TimeProvider timeProvider) : IRequestHandler<GetDeploymentMetricsQuery, DeploymentMetrics?>
{
    public async Task<DeploymentMetrics?> Handle(GetDeploymentMetricsQuery request, CancellationToken cancellationToken)
    {
        if (!await deploymentClient.AreMetricsAvailable())
        {
            return null;
        }

        var containersMetrics = await deploymentClient.GetDeploymentStatistics(request.Namespace, request.DeploymentName);

        var cpuUsage = containersMetrics.SumOrDefault(x => x.CpuUsage, 0);
        var memoryUsage = containersMetrics.SumOrDefault(x => x.MemoryUsage, 0);
        var timestamp = containersMetrics.MaxOrDefault(x => x.TimestampUtc, timeProvider.GetUtcNow().DateTime);

        return new DeploymentMetrics(timestamp, cpuUsage, memoryUsage);
    }
}
