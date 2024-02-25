using k8s;
using k8s.Models;

namespace DeploymentCenter.Namespaces.Infrastructure;

internal interface IKubernetesClientWrapper
{
    Task<V1NamespaceList> GetNamespaces();
}

internal class KubernetesClientWrapper : IKubernetesClientWrapper
{
    private readonly IKubernetes _kubernetes;

    public KubernetesClientWrapper(IKubernetes kubernetes)
    {
        _kubernetes = kubernetes;
    }

    public Task<V1NamespaceList> GetNamespaces() =>
        _kubernetes.CoreV1.ListNamespaceAsync();
}
