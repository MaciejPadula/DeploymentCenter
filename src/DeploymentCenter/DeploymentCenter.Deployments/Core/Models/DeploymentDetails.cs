namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct DeploymentDetails(
    string Namespace,
    string Name,
    string ApplicationName,
    int AliveReplicas,
    int AllReplicas);
