using DeploymentCenter.Deployments.Features.GetDeploymentsList.Contract;
using DeploymentCenter.Deployments.Shared;
using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentsList;

internal class GetDeploymentsListHandler(IDeploymentClient deploymentClient) : IRequestHandler<GetDeploymentsListQuery, List<DeploymentBasicInfo>>
{
    public async Task<List<DeploymentBasicInfo>> Handle(GetDeploymentsListQuery request, CancellationToken cancellationToken)
    {
        return await deploymentClient.GetBasicInfos(request.Namespace);
    }
}
