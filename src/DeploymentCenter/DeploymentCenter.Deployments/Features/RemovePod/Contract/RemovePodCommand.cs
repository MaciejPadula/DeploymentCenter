using MediatR;

namespace DeploymentCenter.Deployments.Features.RemovePod.Contract;

public record RemovePodCommand(
    string Namespace,
    string PodName) : IRequest;
