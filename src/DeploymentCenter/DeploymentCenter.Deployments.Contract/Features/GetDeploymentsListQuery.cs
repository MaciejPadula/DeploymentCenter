using DeploymentCenter.Deployments.Contract.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetDeploymentsListQuery(
    string Namespace) : IRequest<List<DeploymentBasicInfo>>;
