using DeploymentCenter.Deployments.Api.Shared.Models;

namespace DeploymentCenter.Deployments.Api.Features.CreateDeployment;

internal record CreateDeploymentRequest(
    string Namespace,
    string Name,
    string ApplicationName,
    int Replicas,
    List<Container> Containers);
