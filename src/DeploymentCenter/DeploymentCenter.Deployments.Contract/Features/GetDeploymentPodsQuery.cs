using DeploymentCenter.Deployments.Contract.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetDeploymentPodsQuery(
    string Namespace,
    string DeploymentName) : IRequest<List<Pod>>;
