using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Extensions;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentDetailsHandler : IRequestHandler<GetDeploymentDetailsQuery, DeploymentDetails?>
{
    private readonly IKubernetesClientWrapper _kubernetesClientWrapper;

    public GetDeploymentDetailsHandler(IKubernetesClientWrapper kubernetesClientWrapper)
    {
        _kubernetesClientWrapper = kubernetesClientWrapper;
    }

    public async Task<DeploymentDetails?> Handle(GetDeploymentDetailsQuery request, CancellationToken cancellationToken)
    {
        var deploy = await _kubernetesClientWrapper.GetDeployment(
            request.Namespace,
            request.DeploymentName);

        return deploy?.ToDetails();
    }
}
