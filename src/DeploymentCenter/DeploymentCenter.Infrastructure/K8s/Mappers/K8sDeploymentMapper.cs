﻿using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using DeploymentCenter.Pods.Core.Models;
using DeploymentCenter.SharedKernel.Models;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.K8s.Mappers;

internal interface IK8sDeploymentMapper
{
    V1Deployment Map(Deployment deployment);
    DeploymentBasicInfo MapBasicInfo(V1Deployment deployment, IList<V1Pod> pods);
    Container MapContainer(V1Container container);
    IEnumerable<V1EnvVar> MapEnvVars(IEnumerable<EnvironmentVariable> environmentVariables);
    DeploymentVolume MapVolume(V1Volume v1Volume);
}

internal class K8sDeploymentMapper(IK8sPodMapper k8SPodMapper) : IK8sDeploymentMapper
{
    public V1Deployment Map(Deployment deployment) =>
        new()
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
                        { K8sConsts.ApplicationNameDictionaryKey, deployment.ApplicationName }
                    }
                },
                Template = new()
                {
                    Metadata = new()
                    {
                        Labels = new Dictionary<string, string>()
                        {
                            { K8sConsts.ApplicationNameDictionaryKey, deployment.ApplicationName }
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
        };

    public DeploymentBasicInfo MapBasicInfo(V1Deployment deployment, IList<V1Pod> pods) => new(deployment.Metadata.Name, MapStatus(pods));

    private DeploymentStatus MapStatus(IList<V1Pod> pods)
    {
        var status = pods
            .Select(k8SPodMapper.Map)
            .ToList();

        var error = status.FirstOrDefault(x => x.Status.Health == PodHealth.Terminated);

        if (error != default)
        {
            return DeploymentStatus.Error;
        }

        var healthy = status.FirstOrDefault(x => x.Status.Health == PodHealth.Running);

        if (healthy != default)
        {
            return DeploymentStatus.Healthy;
        }

        var waiting = status.FirstOrDefault(x => x.Status.Health == PodHealth.Waiting);

        if (waiting != default)
        {
            return DeploymentStatus.Waiting;
        }

        return DeploymentStatus.Unknown;

    }

    public Container MapContainer(V1Container container) =>
        new(
            container.Name,
            container.Image,
            container
                .Ports?
                .Select(x => new ContainerPort(x.ContainerPort, x.HostPort))?
                .ToList() ?? [],
            container
                .VolumeMounts?
                .Select(x => new ContainerVolume(x.Name, x.MountPath))?
                .ToList() ?? [],
            container.Env?
                .Select(x => new EnvironmentVariable(x.Name, x.Value, x.ValueFrom?.ConfigMapKeyRef?.Name))?
                .ToList() ?? []);

    public IEnumerable<V1EnvVar> MapEnvVars(IEnumerable<EnvironmentVariable> environmentVariables) =>
        environmentVariables
            .Select(x => new V1EnvVar
            {
                Name = x.Key,
                Value = string.IsNullOrEmpty(x.ConfigMapName) ? x.Value : null,
                ValueFrom = !string.IsNullOrEmpty(x.ConfigMapName)
                    ? new V1EnvVarSource
                    {
                        ConfigMapKeyRef = new V1ConfigMapKeySelector
                        {
                            Name = x.ConfigMapName,
                            Key = x.Key
                        }
                    }
                    : null
            });

    public DeploymentVolume MapVolume(V1Volume v1Volume) => new(
        v1Volume.Name,
        v1Volume.PersistentVolumeClaim?.ClaimName);
}
