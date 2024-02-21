using DeploymentCenter.Deployments.Contract.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetDeploymentContainersQuery(
    string Namespace,
    string DeploymentName) : IRequest<List<Container>>;
