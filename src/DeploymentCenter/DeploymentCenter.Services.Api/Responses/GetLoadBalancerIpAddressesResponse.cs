using DeploymentCenter.Api;

namespace DeploymentCenter.Services.Api.Responses;

public record GetLoadBalancerIpAddressesResponse(
    List<string> IpAddresses) : IApiResponse;
