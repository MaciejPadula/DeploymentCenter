using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.GetLoadBalancerDetails.Contract;

public readonly record struct GetLoadBalancerDetailsQuery(
    string Namespace,
    string LoadBalancerName) : IRequest<LoadBalancerDetails?>;
