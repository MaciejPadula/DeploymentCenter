namespace DeploymentCenter.Services.Core.Models;

public record LoadBalancerDetails(
    string Namespace,
    string Name,
    string ApplicationName);
