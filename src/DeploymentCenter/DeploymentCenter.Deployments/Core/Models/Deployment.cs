namespace DeploymentCenter.Deployments.Core.Models;

public record Deployment(
    string Namespace,
    string Name,
    string ApplicationName,
    int Replicas,
    List<Container> Containers);