using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

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
