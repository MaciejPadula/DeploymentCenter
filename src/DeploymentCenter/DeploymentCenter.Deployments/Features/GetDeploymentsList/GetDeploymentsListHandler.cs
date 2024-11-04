using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentsList.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentsList;

internal class GetDeploymentsListHandler(IDeploymentClient deploymentClient) : IRequestHandler<GetDeploymentsListQuery, List<DeploymentBasicInfo>>
{
    public async Task<List<DeploymentBasicInfo>> Handle(GetDeploymentsListQuery request, CancellationToken cancellationToken)
    {
        return await deploymentClient.GetBasicInfos(request.Namespace);
    }
}
