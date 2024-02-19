using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Responses;

public record GetDeploymentDetailsResponse(
    string Namespace,
    string DeploymentName,
    int AliveReplicas,
    int AllReplicas) : IApiResponse;
