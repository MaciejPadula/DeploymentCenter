using DeploymentCenter.Namespaces.Features.Shared;
using k8s;

namespace DeploymentCenter.Infrastructure.K8s;

internal class K8sNamespaceClient(IKubernetesClientFactory kubernetesClientFactory) : INamespaceClient
{
    private readonly IKubernetes _kubernetes = kubernetesClientFactory.GetClient();

    public async Task<List<string>> GetNamespaces()
    {
        var namespaces = await _kubernetes.CoreV1.ListNamespaceAsync();

        return namespaces
            .Items
            .Select(x => x.Metadata.Name)
            .ToList();
    }
}
