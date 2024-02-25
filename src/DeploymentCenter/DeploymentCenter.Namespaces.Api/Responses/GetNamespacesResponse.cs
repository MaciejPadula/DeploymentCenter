using DeploymentCenter.Api;
using DeploymentCenter.Namespaces.Api.Entities;

namespace DeploymentCenter.Namespaces.Api.Responses;

public record GetNamespacesResponse(
    List<Namespace> Namespaces) : IApiResponse;
