namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentDetails;

internal record GetDeploymentDetailsResponse(
    string Namespace,
    string DeploymentName,
    string ApplicationName,
    int AliveReplicas,
    int AllReplicas);
