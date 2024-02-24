using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Extensions;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentContainersHandler : IRequestHandler<GetDeploymentContainersQuery, List<Container>>
{
    private readonly IKubernetesClientWrapper _kubernetesClientWrapper;

    public GetDeploymentContainersHandler(IKubernetesClientWrapper kubernetesClientWrapper)
    {
        _kubernetesClientWrapper = kubernetesClientWrapper;
    }

    public async Task<List<Container>> Handle(GetDeploymentContainersQuery request, CancellationToken cancellationToken)
    {
        var containers = await _kubernetesClientWrapper.GetDeploymentContainers(
            request.Namespace,
            request.DeploymentName);

        return containers.ToDtos();
    }
}
