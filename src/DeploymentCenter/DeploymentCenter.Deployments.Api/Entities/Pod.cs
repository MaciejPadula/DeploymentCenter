using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Entities;

public record Pod(
    string Name,
    string Status,
    string Ip) : IApiEntity;
