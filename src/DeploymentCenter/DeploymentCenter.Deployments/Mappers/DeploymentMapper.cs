using DeploymentCenter.Deployments.Contract.Models;
using k8s.Models;

namespace DeploymentCenter.Deployments.Mappers;

internal static class DeploymentMapper
{
    public static DeploymentDetails ToDetails(this V1Deployment deployment) =>
        new(deployment.Metadata.NamespaceProperty,
            deployment.Metadata.Name,
            deployment.Status.AvailableReplicas ?? 0,
            deployment.Spec.Replicas ?? 0);
}
