using MediatR;

namespace DeploymentCenter.Deployments.Features.RemoveDeployment.Contract;

public record RemoveDeploymentCommand(
    string Namespace,
    string DeploymentName) : IRequest;