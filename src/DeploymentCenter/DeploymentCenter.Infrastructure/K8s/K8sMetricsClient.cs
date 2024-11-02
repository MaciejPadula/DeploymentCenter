using DeploymentCenter.Metrics.Features.Shared;
using DeploymentCenter.SharedKernel.Extensions;
using k8s;
using System.Net.Http.Headers;

namespace DeploymentCenter.Infrastructure.K8s;

internal class K8sMetricsClient(IKubernetesClientFactory kubernetesClientFactory) : IMetricsClient
{
    private readonly IKubernetes _kubernetes = kubernetesClientFactory.GetClient();

    public async Task<CurrentLimit> GetClusterLimits()
    {
        var nodes = await _kubernetes.CoreV1.ListNodeAsync();
        var cpu = nodes.Items.SumOrDefault(x => (decimal)x.Status.Allocatable["cpu"], 0);
        var memory = nodes.Items.SumOrDefault(x => (decimal)x.Status.Allocatable["memory"], 0);
        return new CurrentLimit(cpu, memory);
    }

    public async Task<CurrentUsage> GetClusterMetrics()
    {
        var metrics = await _kubernetes.GetKubernetesNodesMetricsAsync();
        var cpu = metrics.Items.SumOrDefault(x => (decimal)x.Usage["cpu"], 0);
        var memory = metrics.Items.SumOrDefault(x => (decimal)x.Usage["memory"], 0);

        return new CurrentUsage(
                cpu,
                memory);
    }
}
