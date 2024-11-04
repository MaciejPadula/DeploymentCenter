using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.GetLoadBalancerPorts.Contract;

public readonly record struct GetLoadBalancerPortsQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<List<LoadBalancerPort>>;
