using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.GetLoadBalancerDetails.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.GetLoadBalancerDetails;

internal class GetLoadBalancerDetailsHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancerDetailsQuery, LoadBalancerDetails?>
{
    public async Task<LoadBalancerDetails?> Handle(GetLoadBalancerDetailsQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancerDetails(request.Namespace, request.LoadBalancerName);
    }
}
