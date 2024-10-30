using DeploymentCenter.Deployments.Contract.Exceptions;
using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.Deployments.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features;
internal class ScaleDeploymentHandler(
    IDeploymentClient deploymentClient,
    IReplicasCountValidator replicasCountValidator) : IRequestHandler<ScaleDeploymentCommand>
{
    public async Task Handle(ScaleDeploymentCommand request, CancellationToken cancellationToken)
    {
        bool isValid = replicasCountValidator.Validate(request.ReplicasCount);

        if (!isValid)
        {
            throw new ReplicasInvalidException(request.ReplicasCount);
        }

        await deploymentClient.ScaleDeployment(request.Namespace, request.DeploymentName, request.ReplicasCount);
    }
}
