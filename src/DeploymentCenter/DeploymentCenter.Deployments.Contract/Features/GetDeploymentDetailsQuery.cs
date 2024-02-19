using DeploymentCenter.Deployments.Contract.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetDeploymentDetailsQuery(
    string Namespace,
    string DeploymentName) : IRequest<DeploymentDetails?>;
