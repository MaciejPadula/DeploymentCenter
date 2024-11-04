using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.GetLoadBalancersList.Contract;

public readonly record struct GetLoadBalancersListQuery(
    string Namespace) : IRequest<List<LoadBalancerBasicInfo>>;
