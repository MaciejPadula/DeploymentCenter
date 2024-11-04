using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetDeploymentMetrics.Contract;

public readonly record struct GetDeploymentMetricsQuery(
    string Namespace,
    string DeploymentName) : IRequest<CurrentUsage?>;
