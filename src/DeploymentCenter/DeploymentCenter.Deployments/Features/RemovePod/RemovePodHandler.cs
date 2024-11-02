using DeploymentCenter.Deployments.Features.RemovePod.Contract;
using DeploymentCenter.Deployments.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features.RemovePod;

internal class RemovePodHandler(IDeploymentClient deploymentClient) : IRequestHandler<RemovePodCommand>
{
    public async Task Handle(RemovePodCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.RemovePod(request.Namespace, request.PodName);
    }
}
