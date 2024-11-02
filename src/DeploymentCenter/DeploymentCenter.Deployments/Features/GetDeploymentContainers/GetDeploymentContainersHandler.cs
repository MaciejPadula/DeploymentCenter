using DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;
using DeploymentCenter.Deployments.Shared;
using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentContainers;

internal class GetDeploymentContainersHandler : IRequestHandler<GetDeploymentContainersQuery, List<Container>>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentContainersHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<List<Container>> Handle(GetDeploymentContainersQuery request, CancellationToken cancellationToken)
    {
        return await _deploymentClient.GetContainers(
            request.Namespace,
            request.DeploymentName);
    }
}
