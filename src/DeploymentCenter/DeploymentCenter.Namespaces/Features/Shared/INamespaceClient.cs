namespace DeploymentCenter.Namespaces.Features.Shared;

public interface INamespaceClient
{
    Task<List<string>> GetNamespaces();
}
