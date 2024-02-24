using MediatR;
using System.Net;

namespace DeploymentCenter.Services.Contract.Features;

public readonly record struct GetLoadBalancerIpAddressesQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<List<IPAddress>>;
