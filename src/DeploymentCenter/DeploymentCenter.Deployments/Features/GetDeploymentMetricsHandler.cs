using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentMetricsHandler : IRequestHandler<GetDeploymentMetricsQuery, DeploymentMetrics>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentMetricsHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<DeploymentMetrics> Handle(GetDeploymentMetricsQuery request, CancellationToken cancellationToken)
    {
        var containersMetrics = await _deploymentClient.GetDeploymentStatistics(request.Namespace, request.DeploymentName);

        var cpuUsage = containersMetrics.Sum(x => x.CpuUsage);
        var memoryUsage = containersMetrics.Sum(x => x.MemoryUsage);
        var timestamp = containersMetrics.Max(x => x.TimestampUtc);

        return new DeploymentMetrics(timestamp, cpuUsage, memoryUsage);
    }
}
