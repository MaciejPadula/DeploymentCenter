using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerDetailsHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancerDetailsQuery, LoadBalancerDetails?>
{
    public async Task<LoadBalancerDetails?> Handle(GetLoadBalancerDetailsQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancerDetails(request.Namespace, request.LoadBalancerName);
    }
}
