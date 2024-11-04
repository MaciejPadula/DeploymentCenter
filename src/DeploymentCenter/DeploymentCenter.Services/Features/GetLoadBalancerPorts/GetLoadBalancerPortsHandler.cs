using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.GetLoadBalancerPorts.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerPortsHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancerPortsQuery, List<LoadBalancerPort>>
{
    public async Task<List<LoadBalancerPort>> Handle(GetLoadBalancerPortsQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancerPorts(request.Namespace, request.LoadBalancerName);
    }
}
