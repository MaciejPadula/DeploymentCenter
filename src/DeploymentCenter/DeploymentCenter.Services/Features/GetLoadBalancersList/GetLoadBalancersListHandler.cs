using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.GetLoadBalancersList.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.GetLoadBalancersList;

internal class GetLoadBalancersListHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancersListQuery, List<LoadBalancerBasicInfo>>
{
    public async Task<List<LoadBalancerBasicInfo>> Handle(GetLoadBalancersListQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancersBasicInfos(request.Namespace);
    }
}
