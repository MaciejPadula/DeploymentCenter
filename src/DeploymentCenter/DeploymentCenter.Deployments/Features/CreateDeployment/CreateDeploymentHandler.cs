using DeploymentCenter.Deployments.Core.Helpers;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.SharedKernel.Exceptions;
using MediatR;

namespace DeploymentCenter.Deployments.Features.CreateDeployment;

internal class CreateDeploymentHandler(IDeploymentClient deploymentClient, IReplicasCountValidator replicasCountValidator) : IRequestHandler<CreateDeploymentCommand, Result>
{
    public async Task<Result> Handle(CreateDeploymentCommand request, CancellationToken cancellationToken)
    {
        var isValid = replicasCountValidator.Validate(request.Replicas);

        if (!isValid)
        {
            return Result.OnError(new BadRequestException(BadRequestStatusCode.InvalidReplicasCount));
        }

        if (await deploymentClient.DeploymentExists(request.Namespace, request.Name))
        {
            return Result.OnError(new BadRequestException(BadRequestStatusCode.DuplicateName));
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
