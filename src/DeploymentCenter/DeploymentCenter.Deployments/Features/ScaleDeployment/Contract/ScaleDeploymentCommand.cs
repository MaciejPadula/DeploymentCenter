using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Deployments.Features.ScaleDeployment.Contract;

public record ScaleDeploymentCommand(
    string Namespace,
    string DeploymentName,
    int ReplicasCount) : IRequest<Result>;
