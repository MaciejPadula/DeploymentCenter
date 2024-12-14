using MediatR;

namespace DeploymentCenter.Metrics.Features.AreMetricsAvailable.Contract;

public record AreMetricsAvailableQuery(): IRequest<bool>;