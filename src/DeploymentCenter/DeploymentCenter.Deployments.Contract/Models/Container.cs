namespace DeploymentCenter.Deployments.Contract.Models;

public readonly record struct Container(
    string Name,
    string Image,
    Dictionary<string, string> EnvironmentVariables);
