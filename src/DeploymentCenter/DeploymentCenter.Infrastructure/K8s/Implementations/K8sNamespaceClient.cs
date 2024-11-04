using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Namespaces.Features;
using k8s;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sNamespaceClient(IKubernetesClientFactory kubernetesClientFactory) : INamespaceClient
{
    public async Task CreateNamespace(string name)
    {
        using var client = kubernetesClientFactory.GetClient();
        var namespaceObject = new V1Namespace
        {
            Metadata = new V1ObjectMeta
            {
                Name = name
            }
        };

        await client.CoreV1.CreateNamespaceAsync(namespaceObject);
    }

    public async Task<List<string>> GetNamespaces()
    {
        using var client = kubernetesClientFactory.GetClient();
        var namespaces = await client.CoreV1.ListNamespaceAsync();

        return namespaces
            .Items
            .Select(x => x.Metadata.Name)
            .ToList();
    }
}
