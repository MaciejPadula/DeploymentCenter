using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Extensions;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancersListHandler : IRequestHandler<GetLoadBalancersListQuery, List<LoadBalancerBasicInfo>>
{
    private readonly IKubernetesClientWrapper _kubernetesClient;

    public GetLoadBalancersListHandler(IKubernetesClientWrapper kubernetesClient)
    {
        _kubernetesClient = kubernetesClient;
    }

    public async Task<List<LoadBalancerBasicInfo>> Handle(GetLoadBalancersListQuery request, CancellationToken cancellationToken)
    {
        var services = await _kubernetesClient.GetServices(request.Namespace);

        return services
            .Items
            .Where(x => x.Spec.Type == Consts.LoadBalancerKey)
            .ToLBBasicInfo()
            .ToList();
    }
}
