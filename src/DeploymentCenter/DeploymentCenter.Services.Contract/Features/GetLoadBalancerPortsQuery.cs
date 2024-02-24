using DeploymentCenter.Services.Contract.Models;
using MediatR;

namespace DeploymentCenter.Services.Contract.Features;

public readonly record struct GetLoadBalancerPortsQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<List<Port>>;
