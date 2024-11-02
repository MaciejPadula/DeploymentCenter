using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentsList.Contract;

public readonly record struct GetDeploymentsListQuery(
    string Namespace) : IRequest<List<DeploymentBasicInfo>>;
