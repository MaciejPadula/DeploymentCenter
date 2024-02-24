namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct DeploymentDetails(
    string Namespace,
    string Name,
    string ApplicationName,
    int AliveReplicas,
    int AllReplicas);
