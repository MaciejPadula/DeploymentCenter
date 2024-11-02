using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.Deployments.Features.ScaleDeployment.Contract;
using DeploymentCenter.Deployments.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features.ScaleDeployment;
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
