namespace DeploymentCenter.Services.Api.Features.GetLoadBalancersList;

internal readonly record struct LoadBalancer(
    string Namespace,
    string Name);
