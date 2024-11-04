namespace DeploymentCenter.Services.Core.Models;

public record LoadBalancer(
    string Namespace,
    string Name,
    string ApplicationName,
    List<LoadBalancerPort> Ports,
    List<string> ExternalIps);
