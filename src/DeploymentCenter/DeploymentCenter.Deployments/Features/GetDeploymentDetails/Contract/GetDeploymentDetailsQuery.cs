using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;

public readonly record struct GetDeploymentDetailsQuery(
    string Namespace,
    string DeploymentName) : IRequest<DeploymentDetails?>;
