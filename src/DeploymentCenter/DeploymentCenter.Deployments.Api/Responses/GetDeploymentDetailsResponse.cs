using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Responses;

public record GetDeploymentDetailsResponse(
    string Namespace,
    string DeploymentName,
    string ApplicationName,
    int AliveReplicas,
    int AllReplicas) : IApiResponse;
