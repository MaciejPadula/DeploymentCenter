using DeploymentCenter.Metrics.Features.Shared;
using MediatR;

namespace DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;

public class GetClusterMetricsQuery() : IRequest<CurrentMetrics>;
