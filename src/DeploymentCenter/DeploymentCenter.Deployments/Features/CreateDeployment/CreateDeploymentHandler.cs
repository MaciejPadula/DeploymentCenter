using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.Deployments.Core.Helpers;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.CreateDeployment;

internal class CreateDeploymentHandler(IDeploymentClient deploymentClient, IReplicasCountValidator replicasCountValidator) : IRequestHandler<CreateDeploymentCommand>
{
    public async Task Handle(CreateDeploymentCommand request, CancellationToken cancellationToken)
    {
        var isValid = replicasCountValidator.Validate(request.Replicas);

        if (!isValid)
        {
            throw new ReplicasInvalidException(request.Replicas);
        }

        await deploymentClient.CreateDeployment(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Replicas,
            request.Containers));
    }
}
