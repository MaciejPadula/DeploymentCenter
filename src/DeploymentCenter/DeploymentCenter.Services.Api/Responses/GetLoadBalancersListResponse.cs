using DeploymentCenter.Api;
using DeploymentCenter.Services.Api.Entities;

namespace DeploymentCenter.Services.Api.Responses;

public record GetLoadBalancersListResponse(
    List<LoadBalancer> LoadBalancers) : IApiResponse;
