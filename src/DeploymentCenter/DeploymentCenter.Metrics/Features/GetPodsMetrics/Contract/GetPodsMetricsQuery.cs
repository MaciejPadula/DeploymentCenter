using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetPodsMetrics.Contract;

public record GetPodsMetricsQuery(string Namespace, string? PodPrefix) : IRequest<Dictionary<string, CurrentUsage>>;
