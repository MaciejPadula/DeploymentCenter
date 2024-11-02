using DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;
using DeploymentCenter.Deployments.Shared;
using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentPods;

internal class GetDeploymentPodsHandler : IRequestHandler<GetDeploymentPodsQuery, List<Pod>>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentPodsHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<List<Pod>> Handle(GetDeploymentPodsQuery request, CancellationToken cancellationToken)
    {
        return await _deploymentClient.GetPods(
            request.Namespace,
            request.DeploymentName);
    }
}
