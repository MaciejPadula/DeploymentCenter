using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentContainers;

internal class GetDeploymentContainersHandler(IDeploymentClient deploymentClient) : IRequestHandler<GetDeploymentContainersQuery, List<Container>>
{
    public async Task<List<Container>> Handle(GetDeploymentContainersQuery request, CancellationToken cancellationToken)
    {
        return await deploymentClient.GetContainers(
            request.Namespace,
            request.DeploymentName);
    }
}
