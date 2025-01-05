using DeploymentCenter.SharedKernel.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentContainers.Contract;

public readonly record struct GetDeploymentContainersQuery(
    string Namespace,
    string DeploymentName) : IRequest<List<Container>>;
