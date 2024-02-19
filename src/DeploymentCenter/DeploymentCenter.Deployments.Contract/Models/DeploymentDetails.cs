namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct DeploymentDetails(
    string Namespace,
    string Name,
    int AliveReplicas,
    int AllReplicas);
