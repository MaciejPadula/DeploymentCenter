using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Helpers;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;
using System.Linq;
using System.Net;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerIpAddressesHandler(IServiceClient serviceClient, IIpAddressParser ipAddressParser) : IRequestHandler<GetLoadBalancerIpAddressesQuery, List<IPAddress>>
{
    public async Task<List<IPAddress>> Handle(GetLoadBalancerIpAddressesQuery request, CancellationToken cancellationToken)
    {
        var addresses = await serviceClient.GetLoadBalancerIpAddresses(request.Namespace, request.LoadBalancerName);
        return addresses.Select(ipAddressParser.Parse).ToList();
    }
}
