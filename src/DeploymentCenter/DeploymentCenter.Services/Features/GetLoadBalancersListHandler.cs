using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancersListHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancersListQuery, List<LoadBalancerBasicInfo>>
{
    public async Task<List<LoadBalancerBasicInfo>> Handle(GetLoadBalancersListQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancersBasicInfos(request.Namespace);
    }
}
