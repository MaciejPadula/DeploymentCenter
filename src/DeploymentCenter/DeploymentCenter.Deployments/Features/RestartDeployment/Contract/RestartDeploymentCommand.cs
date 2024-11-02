using MediatR;

namespace DeploymentCenter.Deployments.Features.RestartDeployment.Contract;

public record RestartDeploymentCommand(
    string Namespace,
    string DeploymentName) : IRequest;
