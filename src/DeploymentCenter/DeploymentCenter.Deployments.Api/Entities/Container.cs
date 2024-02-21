using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Entities;

public record Container(
    string Name,
    string Image,
    Dictionary<string, string> EnvironmentVariables) : IApiEntity;
