using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public record RestartDeploymentCommand(
    string Namespace,
    string DeploymentName) : IRequest;
