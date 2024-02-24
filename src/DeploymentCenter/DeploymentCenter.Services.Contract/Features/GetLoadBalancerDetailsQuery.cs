using DeploymentCenter.Services.Contract.Models;
using MediatR;

namespace DeploymentCenter.Services.Contract.Features;

public readonly record struct GetLoadBalancerDetailsQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<LoadBalancerDetails?>;
