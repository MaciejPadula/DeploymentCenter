using DeploymentCenter.Deployments.Api.Entities;

namespace DeploymentCenter.Deployments.Api.Responses;

public record GetDeploymentContainersResponse(
    List<Container> Containers);
