using DeploymentCenter.Api;

namespace DeploymentCenter.Services.Api.Entities;

public readonly record struct LoadBalancer(
    string Namespace,
    string Name) : IApiEntity;
