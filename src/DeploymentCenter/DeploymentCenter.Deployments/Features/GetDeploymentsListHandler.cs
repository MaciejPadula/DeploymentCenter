using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.Deployments.Mappers;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentsListHandler : IRequestHandler<GetDeploymentsListQuery, List<DeploymentBasicInfo>>
{
    private readonly IKubernetesClientWrapper _kubernetesClientWrapper;

    public GetDeploymentsListHandler(IKubernetesClientWrapper kubernetesClientWrapper)
    {
        _kubernetesClientWrapper = kubernetesClientWrapper;
    }

    public async Task<List<DeploymentBasicInfo>> Handle(GetDeploymentsListQuery request, CancellationToken cancellationToken)
    {
        var deployments = await _kubernetesClientWrapper.GetDeployments(request.Namespace);

        return deployments
            .Items
            .Select(x => x.ToBasicInfo())
            .ToList();
    }
}
