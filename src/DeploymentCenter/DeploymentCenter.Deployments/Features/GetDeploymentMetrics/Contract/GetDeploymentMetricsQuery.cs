using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentMetrics.Contract;

public readonly record struct GetDeploymentMetricsQuery(
    string Namespace,
    string DeploymentName) : IRequest<DeploymentMetrics?>;
