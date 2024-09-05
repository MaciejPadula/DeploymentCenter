namespace DeploymentCenter.Namespaces.Infrastructure;

public interface INamespaceClient
{
    Task<List<string>> GetNamespaces();
}
