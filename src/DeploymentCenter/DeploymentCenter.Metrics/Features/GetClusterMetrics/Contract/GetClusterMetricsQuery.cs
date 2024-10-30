using MediatR;

namespace DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;

public class GetClusterMetricsQuery() : IRequest<ClusterMetrics>;
