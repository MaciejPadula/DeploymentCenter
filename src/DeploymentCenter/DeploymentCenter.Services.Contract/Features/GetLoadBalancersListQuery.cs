using DeploymentCenter.Services.Contract.Models;
using MediatR;

namespace DeploymentCenter.Services.Contract.Features;

public readonly record struct GetLoadBalancersListQuery(
    string Namespace) : IRequest<List<LoadBalancerBasicInfo>>;
