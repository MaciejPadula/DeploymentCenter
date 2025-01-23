using MediatR;

namespace DeploymentCenter.Pods.Features.RemovePod.Contract;

public record RemovePodCommand(
    string Namespace,
    string PodName) : IRequest;
