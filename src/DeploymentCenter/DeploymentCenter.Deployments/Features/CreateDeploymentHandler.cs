using DeploymentCenter.Deployments.Contract.Exceptions;
using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.Deployments.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

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
