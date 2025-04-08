using DeploymentCenter.Deployments.Core.Helpers;
using DeploymentCenter.Deployments.Features.ScaleDeployment.Contract;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.SharedKernel.Exceptions;
using MediatR;

namespace DeploymentCenter.Deployments.Features.ScaleDeployment;
internal class ScaleDeploymentHandler(
    IDeploymentClient deploymentClient,
    IReplicasCountValidator replicasCountValidator) : IRequestHandler<ScaleDeploymentCommand, Result>
{
    public async Task<Result> Handle(ScaleDeploymentCommand request, CancellationToken cancellationToken)
    {
        bool isValid = replicasCountValidator.Validate(request.ReplicasCount);

        if (!isValid)
        {
            return Result.OnError(new BadRequestException(BadRequestStatusCode.InvalidReplicasCount));
        }

        await deploymentClient.ScaleDeployment(request.Namespace, request.DeploymentName, request.ReplicasCount);
        return Result.OnSuccess();
    }
}
