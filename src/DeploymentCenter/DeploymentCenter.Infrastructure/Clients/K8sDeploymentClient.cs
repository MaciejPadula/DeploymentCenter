﻿using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.SharedKernel;
using k8s;
using k8s.Autorest;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.Clients;

internal class K8sDeploymentClient(IKubernetes kubernetes) : IDeploymentClient
{
    public async Task<bool> AreMetricsAvailable()
    {
        try
        {
            var metrics = await kubernetes.GetKubernetesNodesMetricsAsync();
            return true;
        }
        catch (HttpOperationException ex)
        {
            if (ex.Response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }

            throw;
        }
    }

    public async Task CreateDeployment(Deployment deployment)
    {
        await kubernetes.AppsV1.CreateNamespacedDeploymentAsync(new()
        {
            Metadata = new()
            {
                Name = deployment.Name,
                NamespaceProperty = deployment.Namespace
            },
            Spec = new()
            {
                Replicas = deployment.Replicas,
                Selector = new()
                {
                    MatchLabels = new Dictionary<string, string>()
                    {
                        { Consts.ApplicationNameDictionaryKey, deployment.ApplicationName }
                    }
                },
                Template = new()
                {
                    Metadata = new()
                    {
                        Labels = new Dictionary<string, string>()
                        {
                            { Consts.ApplicationNameDictionaryKey, deployment.ApplicationName }
                        }
                    },
                    Spec = new()
                    {
                        Containers = deployment.Containers.Select(c => new V1Container
                        {
                            Name = c.Name,
                            Image = c.Image,
                            Env = c.EnvironmentVariables.Select(env => new V1EnvVar
                            {
                                Name = env.Key,
                                Value = string.IsNullOrEmpty(env.ConfigMapName) ? env.Value : null,
                                ValueFrom = !string.IsNullOrEmpty(env.ConfigMapName) ? new V1EnvVarSource
                                {
                                    ConfigMapKeyRef = new V1ConfigMapKeySelector
                                    {
                                        Name = env.ConfigMapName,
                                        Key = env.Key
                                    }
                                } : null
                            }).ToList(),
                            Ports = c.Ports.Select(p => new V1ContainerPort
                            {
                                ContainerPort = p.Port,
                                HostPort = p.HostPort
                            }).ToList()
                        }).ToList()
                    }
                }
            }
        },
        deployment.Namespace);
    }

    public async Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace)
    {
        var deployments = await kubernetes.AppsV1.ListNamespacedDeploymentAsync(@namespace);
        return deployments
            .Items
            .Select(x => new DeploymentBasicInfo(x.Metadata.Name))
            .ToList();
    }

    public async Task<List<Container>> GetContainers(string @namespace, string deploymentName)
    {
        var deploy = await GetDeployment(@namespace, deploymentName);
        return deploy?
            .Spec?
            .Template?
            .Spec?
            .Containers?
            .Select(x => new Container(
                x.Name,
                x.Image,
                x.Ports?
                    .Select(x => new ContainerPort(x.ContainerPort, x.HostPort))?
                    .ToList() ?? [],
                x.Env?
                    .Select(x => new EnvironmentVariable(x.Name, x.Value, x.ValueFrom?.ConfigMapKeyRef?.Name))?
                    .ToList() ?? []))?
            .ToList() ?? [];
    }

    public async Task<List<Deployments.Infrastructure.ContainerMetrics>> GetDeploymentStatistics(string @namespace, string deploymentName)
    {
        var deploy = await GetDeployment(@namespace, deploymentName);
        if (deploy is null)
        {
            return [];
        }

        var pods = await kubernetes.CoreV1.ListNamespacedPodAsync(@namespace);

        var metrics = await kubernetes.GetKubernetesPodsMetricsByNamespaceAsync(@namespace);

        return metrics.Items
            .Where(x => x.Metadata.Name.StartsWith(deploymentName))
            .SelectMany(x => x.Containers.Select(c =>
                new Deployments.Infrastructure.ContainerMetrics(
                    c.Name,
                    x.Timestamp.GetValueOrDefault(),
                    c.Usage["cpu"],
                    c.Usage["memory"]
                )
            ))
            .ToList();
    }

    public async Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName)
    {
        var deploy = await GetDeployment(@namespace, deploymentName);
        if (deploy is null)
        {
            return null;
        }

        return new(
            deploy.Metadata.NamespaceProperty,
            deploy.Metadata.Name,
            deploy.Spec.Selector.MatchLabels.TryGetValue(Consts.ApplicationNameDictionaryKey, out var applicationName) ? applicationName : string.Empty,
            deploy.Status.AvailableReplicas ?? 0,
            deploy.Spec.Replicas ?? 0);
    }

    public async Task<string> GetPodLogs(string @namespace, string podName)
    {
        using var result = await kubernetes.CoreV1.ReadNamespacedPodLogWithHttpMessagesAsync(
            podName,
            @namespace).ConfigureAwait(false);

        using var reader = new StreamReader(result.Body, System.Text.Encoding.UTF8);
        return await reader.ReadToEndAsync();
    }

    public async Task<List<Pod>> GetPods(string @namespace, string deploymentName)
    {
        var pods = await kubernetes.CoreV1.ListNamespacedPodAsync(@namespace);
        return pods.Items
            .Where(x => x.Metadata.Name.StartsWith(deploymentName))
            .Select(x => new Pod(
                x.Metadata.Name,
                x.Status.Phase,
                x.Status.PodIP,
                !x.Status.ContainerStatuses.Any(c => !c.Ready)))
            .ToList();
    }

    private async Task<V1Deployment?> GetDeployment(string @namespace, string deploymentName)
    {
        var deploys = await kubernetes.AppsV1.ListNamespacedDeploymentAsync(@namespace);
        return deploys
            .Items
            .FirstOrDefault(d => d.Metadata.Name == deploymentName);
    }
}
