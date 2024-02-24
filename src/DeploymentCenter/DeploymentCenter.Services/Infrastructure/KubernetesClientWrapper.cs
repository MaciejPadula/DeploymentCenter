using k8s;
using k8s.Models;
using System.Xml.Linq;

namespace DeploymentCenter.Services.Infrastructure;

internal interface IKubernetesClientWrapper
{
    Task<V1ServiceList> GetServices(string @namespace);
}

internal class KubernetesClientWrapper : IKubernetesClientWrapper
{
    private readonly IKubernetes _kubernetes;

    public KubernetesClientWrapper(IKubernetes kubernetes)
    {
        _kubernetes = kubernetes;
    }

    public Task<V1ServiceList> GetServices(string @namespace) =>
        _kubernetes.CoreV1.ListNamespacedServiceAsync(@namespace);
}
