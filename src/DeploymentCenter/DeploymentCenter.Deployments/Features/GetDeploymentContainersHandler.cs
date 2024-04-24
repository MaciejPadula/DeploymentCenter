using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

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
