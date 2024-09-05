using DeploymentCenter.Namespaces.Infrastructure;
using k8s;

namespace DeploymentCenter.Infrastructure.Clients;

internal class K8sNamespaceClient(IKubernetes kubernetes) : INamespaceClient
{
    public async Task<List<string>> GetNamespaces()
    {
        var namespaces = await kubernetes.CoreV1.ListNamespaceAsync();

        return namespaces
            .Items
            .Select(x => x.Metadata.Name)
            .ToList();
    }
}
