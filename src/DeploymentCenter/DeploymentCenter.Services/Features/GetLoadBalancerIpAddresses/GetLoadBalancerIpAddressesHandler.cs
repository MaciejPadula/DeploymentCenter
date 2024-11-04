using DeploymentCenter.Services.Core.Helpers;
using DeploymentCenter.Services.Features.GetLoadBalancerIpAddresses.Contract;
using MediatR;
using System.Net;

namespace DeploymentCenter.Services.Features.GetLoadBalancerIpAddresses;

internal class GetLoadBalancerIpAddressesHandler(
    IServiceClient serviceClient,
    IIpAddressParser ipAddressParser) : IRequestHandler<GetLoadBalancerIpAddressesQuery, List<IPAddress>>
{
    public async Task<List<IPAddress>> Handle(GetLoadBalancerIpAddressesQuery request, CancellationToken cancellationToken)
    {
        var addresses = await serviceClient.GetLoadBalancerIpAddresses(request.Namespace, request.LoadBalancerName);
        return addresses.Select(ipAddressParser.Parse).ToList();
    }
}
