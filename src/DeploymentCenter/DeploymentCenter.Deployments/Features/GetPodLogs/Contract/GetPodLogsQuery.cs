using MediatR;

namespace DeploymentCenter.Deployments.Features.GetPodLogs.Contract;

public readonly record struct GetPodLogsQuery(
    string Namespace,
    string PodName) : IRequest<string>;