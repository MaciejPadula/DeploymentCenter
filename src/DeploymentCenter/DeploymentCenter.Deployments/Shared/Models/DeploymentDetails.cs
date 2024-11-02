namespace DeploymentCenter.Deployments.Shared.Models;

public readonly record struct DeploymentDetails(
    string Namespace,
    string Name,
    string ApplicationName,
    int AliveReplicas,
    int AllReplicas);
