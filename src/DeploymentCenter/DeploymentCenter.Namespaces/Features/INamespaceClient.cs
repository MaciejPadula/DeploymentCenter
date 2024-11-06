namespace DeploymentCenter.Namespaces.Features;

public interface INamespaceClient
{
    Task CreateNamespace(string name);
    Task<List<string>> GetNamespaces();
    Task RemoveNamespace(string name);
}
