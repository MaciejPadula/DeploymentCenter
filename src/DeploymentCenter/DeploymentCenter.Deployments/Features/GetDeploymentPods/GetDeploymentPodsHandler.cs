using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentPods;

internal class GetDeploymentPodsHandler(IPodClient podClient) : IRequestHandler<GetDeploymentPodsQuery, List<Pod>>
{
    public async Task<List<Pod>> Handle(GetDeploymentPodsQuery request, CancellationToken cancellationToken)
    {
        return await podClient.GetPods(
            request.Namespace,
            request.DeploymentName);
    }
}
