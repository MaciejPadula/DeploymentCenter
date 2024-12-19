namespace DeploymentCenter.Search.Core.Models;

public enum ResourceType
{
    Unknown = 0,
    Deployment = 1,
    LoadBalancer = 2,
    Volume = 3
}

public record Resource(
    string Name,
    ResourceType Type,
    string? Namespace = null);
