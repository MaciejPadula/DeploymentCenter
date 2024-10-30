using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public record RemoveDeploymentCommand(
    string Namespace,
    string DeploymentName) : IRequest;