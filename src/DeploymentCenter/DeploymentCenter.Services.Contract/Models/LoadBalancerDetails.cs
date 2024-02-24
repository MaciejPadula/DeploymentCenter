namespace DeploymentCenter.Services.Contract.Models;

public record LoadBalancerDetails(
    string Namespace,
    string Name,
    string ApplicationName);
