using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Extensions;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentPodsHandler : IRequestHandler<GetDeploymentPodsQuery, List<Pod>>
{
    private readonly IKubernetesClientWrapper _kubernetesClientWrapper;

    public GetDeploymentPodsHandler(IKubernetesClientWrapper kubernetesClientWrapper)
    {
        _kubernetesClientWrapper = kubernetesClientWrapper;
    }

    public async Task<List<Pod>> Handle(GetDeploymentPodsQuery request, CancellationToken cancellationToken)
    {
        var pods = await _kubernetesClientWrapper.GetDeploymentPods(
            request.Namespace,
            request.DeploymentName);

        return pods
            .Items
            .ToDtos()
            .ToList();
    }
}
