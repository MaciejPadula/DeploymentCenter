using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using DeploymentCenter.SharedKernel.Extensions;
using k8s;

namespace DeploymentCenter.Infrastructure.K8s;

internal class K8sMetricsClient(IKubernetesClientFactory kubernetesClientFactory) : IMetricsClient
{
    private readonly IKubernetes _kubernetes = kubernetesClientFactory.GetClient();

    public async Task<ClusterMetrics> GetClusterMetrics()
    {
        var metrics = await _kubernetes.GetKubernetesNodesMetricsAsync();

        var cpu = metrics.Items.SumOrDefault(x => (decimal)x.Usage["cpu"], 0);
        var memory = metrics.Items.SumOrDefault(x => (decimal)x.Usage["memory"], 0);

        return new ClusterMetrics(
                cpu,
                memory,
                100,
                100);
    }
}
