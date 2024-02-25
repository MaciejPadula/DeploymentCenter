using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.SharedKernel;
using k8s.Models;

namespace DeploymentCenter.Deployments.Extensions;

internal static class V1DeploymentExtensions
{
    public static DeploymentBasicInfo ToBasicInfo(this V1Deployment deployment) =>
        new(deployment.Metadata.Name);

    public static DeploymentDetails ToDetails(this V1Deployment deployment) =>
        new(deployment.Metadata.NamespaceProperty,
            deployment.Metadata.Name,
            deployment.Spec.Selector.MatchLabels.TryGetValue(
                Consts.ApplicationNameDictionaryKey, out var applicationName) ? applicationName : string.Empty,
            deployment.Status.AvailableReplicas ?? 0,
            deployment.Spec.Replicas ?? 0);
}
