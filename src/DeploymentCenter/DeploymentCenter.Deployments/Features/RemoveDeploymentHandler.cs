using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class RemoveDeploymentHandler(IDeploymentClient deploymentClient) : IRequestHandler<RemoveDeploymentCommand>
{
    public async Task Handle(RemoveDeploymentCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.RemoveDeployment(request.Namespace, request.DeploymentName);
    }
}
