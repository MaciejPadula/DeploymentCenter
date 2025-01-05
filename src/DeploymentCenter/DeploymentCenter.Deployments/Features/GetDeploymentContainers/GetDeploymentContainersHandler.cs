using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using DeploymentCenter.SharedKernel.Models;
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
