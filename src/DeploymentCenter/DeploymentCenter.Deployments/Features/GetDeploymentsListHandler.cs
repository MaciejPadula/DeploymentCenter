using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class GetDeploymentsListHandler : IRequestHandler<GetDeploymentsListQuery, object>
{
    private readonly IKubernetesClientWrapper _kubernetesClientWrapper;

    public GetDeploymentsListHandler(IKubernetesClientWrapper kubernetesClientWrapper)
    {
        _kubernetesClientWrapper = kubernetesClientWrapper;
    }

    public Task<object> Handle(GetDeploymentsListQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
