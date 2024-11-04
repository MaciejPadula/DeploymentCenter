using MediatR;
using System.Net;

namespace DeploymentCenter.Services.Features.GetLoadBalancerIpAddresses.Contract;

public readonly record struct GetLoadBalancerIpAddressesQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<List<IPAddress>>;
