using DeploymentCenter.Services.Core.Models;

namespace DeploymentCenter.Services.Features.AnalyzeLoadBalancer;

public record LoadBalancerAnalyzeContext(
    LoadBalancerDetails Details,
    List<string> Addresses,
    List<LoadBalancerPort> Ports,
    string UserQuestion);
