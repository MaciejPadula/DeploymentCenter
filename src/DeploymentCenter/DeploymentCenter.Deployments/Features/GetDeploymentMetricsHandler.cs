using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentMetricsHandler : IRequestHandler<GetDeploymentMetricsQuery, List<ContainerMetrics>>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentMetricsHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<List<ContainerMetrics>> Handle(GetDeploymentMetricsQuery request, CancellationToken cancellationToken) =>
        await _deploymentClient.GetDeploymentStatistics(request.Namespace, request.DeploymentName);
}
