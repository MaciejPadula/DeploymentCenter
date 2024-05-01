using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentsListHandler : IRequestHandler<GetDeploymentsListQuery, List<DeploymentBasicInfo>>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentsListHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<List<DeploymentBasicInfo>> Handle(GetDeploymentsListQuery request, CancellationToken cancellationToken)
    {
        return await _deploymentClient.GetBasicInfos(request.Namespace);
    }
}
