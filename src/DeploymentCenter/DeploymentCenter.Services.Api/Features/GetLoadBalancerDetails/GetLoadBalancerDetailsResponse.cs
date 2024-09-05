namespace DeploymentCenter.Services.Api.Features.GetLoadBalancerDetails;

internal readonly record struct GetLoadBalancerDetailsResponse(
    string Namespace,
    string LoadBalancerName,
    string ApplicationName);
