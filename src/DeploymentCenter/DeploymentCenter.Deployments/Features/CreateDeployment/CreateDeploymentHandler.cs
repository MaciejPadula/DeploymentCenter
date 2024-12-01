using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.Deployments.Core.Helpers;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Deployments.Features.CreateDeployment;

internal class CreateDeploymentHandler(IDeploymentClient deploymentClient, IReplicasCountValidator replicasCountValidator) : IRequestHandler<CreateDeploymentCommand, Result>
{
    public async Task<Result> Handle(CreateDeploymentCommand request, CancellationToken cancellationToken)
    {
        var isValid = replicasCountValidator.Validate(request.Replicas);

        if (!isValid)
        {
            return Result.OnError(new BadRequestException(DeploymentsStatusCode.InvalidReplicas));
        }

        if (await deploymentClient.DeploymentExists(request.Namespace, request.Name))
        {
            return Result.OnError(new BadRequestException(DeploymentsStatusCode.Duplicate));
        }

        await deploymentClient.CreateDeployment(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Replicas,
            request.Containers));

        return Result.OnSuccess();
    }
}
