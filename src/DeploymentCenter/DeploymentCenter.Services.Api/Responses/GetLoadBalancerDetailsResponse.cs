using DeploymentCenter.Api;

namespace DeploymentCenter.Services.Api.Responses;

public record GetLoadBalancerDetailsResponse(
    string Namespace,
    string LoadBalancerName,
    string ApplicationName) : IApiResponse;
