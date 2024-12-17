using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Metrics.Features.Shared;
using DeploymentCenter.SharedKernel.Extensions;
using k8s;
using k8s.Autorest;

namespace DeploymentCenter.Infrastructure.K8s.Implementations;

internal class K8sMetricsClient(IKubernetesClientFactory kubernetesClientFactory) : IMetricsClient
{
    private const string CPUKey = "cpu";
    private const string MemoryKey = "memory";

    public async Task<bool> AreMetricsAvailable()
    {
        using var client = kubernetesClientFactory.GetClient();
        try
        {
            var metrics = await client.GetKubernetesNodesMetricsAsync();
            return true;
        }
        catch (HttpOperationException ex)
        {
            HashSet<System.Net.HttpStatusCode> unavailableStatusCodes =
            [
                System.Net.HttpStatusCode.NotFound,
                System.Net.HttpStatusCode.ServiceUnavailable 
            ];

            if (unavailableStatusCodes.Contains(ex.Response.StatusCode))
            {
                return false;
            }

            throw;
        }
    }

    public async Task<CurrentLimit> GetClusterLimits()
    {
        var client = kubernetesClientFactory.GetClient();
        var nodes = await client.CoreV1.ListNodeAsync();
        var cpu = nodes.Items.SumOrDefault(x => (decimal)x.Status.Allocatable[CPUKey], 0);
        var memory = nodes.Items.SumOrDefault(x => (decimal)x.Status.Allocatable[MemoryKey], 0);
        return new CurrentLimit(cpu, memory);
    }

    public async Task<CurrentUsage> GetClusterMetrics()
    {
        var client = kubernetesClientFactory.GetClient();
        var metrics = await client.GetKubernetesNodesMetricsAsync();
        var cpu = metrics.Items.SumOrDefault(x => (decimal)x.Usage[CPUKey], 0);
        var memory = metrics.Items.SumOrDefault(x => (decimal)x.Usage[MemoryKey], 0);

        return new CurrentUsage(cpu, memory);
    }

    public async Task<CurrentLimit> GetDeploymentLimits(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        if (deploy is null)
        {
            return new CurrentLimit(0, 0);
        }

        var deploymentLimits = deploy.Spec.Template.Spec.Containers
            .Select(podMetric => podMetric.Resources)
            .ToList();

        var cpu = deploymentLimits.SumOrDefault(x => (decimal)x.Limits[CPUKey], 0);
        var memory = deploymentLimits.SumOrDefault(x => (decimal)x.Limits[MemoryKey], 0);

        return new CurrentLimit(cpu, memory);
    }

    public async Task<CurrentUsage> GetDeploymentMetrics(string @namespace, string deploymentName)
    {
        using var client = kubernetesClientFactory.GetClient();
        var deploy = await client.AppsV1.ReadNamespacedDeploymentAsync(deploymentName, @namespace);
        if (deploy is null)
        {
            return new CurrentUsage(0, 0);
        }

        var metrics = await client.GetKubernetesPodsMetricsByNamespaceAsync(@namespace);
        var deploymentMetrics = metrics.Items
            .Where(x => x.Metadata.Name.StartsWith(deploymentName))
            .SelectMany(podMetric => podMetric.Containers)
            .ToList();

        var cpu = deploymentMetrics.SumOrDefault(x => (decimal)x.Usage[CPUKey], 0);
        var memory = deploymentMetrics.SumOrDefault(x => (decimal)x.Usage[MemoryKey], 0);

        return new CurrentUsage(cpu, memory);
    }
}
