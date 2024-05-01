using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetPodLogsQuery(
    string Namespace,
    string PodName) : IRequest<string>;