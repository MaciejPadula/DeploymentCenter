using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public record ScaleDeploymentCommand(
    string Namespace,
    string DeploymentName,
    int ReplicasCount) : IRequest;
