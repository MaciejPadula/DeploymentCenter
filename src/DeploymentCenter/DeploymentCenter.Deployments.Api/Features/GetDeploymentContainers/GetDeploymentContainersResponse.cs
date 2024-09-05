using DeploymentCenter.Deployments.Api.Shared.Models;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentContainers;

internal record GetDeploymentContainersResponse(List<Container> Containers);
