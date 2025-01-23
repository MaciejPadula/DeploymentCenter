using MediatR;

namespace DeploymentCenter.Pods.Features.GetPodLogs.Contract;

public readonly record struct GetPodLogsQuery(
    string Namespace,
    string PodName) : IRequest<string>;