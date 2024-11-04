using DeploymentCenter.Deployments.Features.RemoveDeployment.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.RemoveDeployment;

internal class RemoveDeploymentHandler(IDeploymentClient deploymentClient) : IRequestHandler<RemoveDeploymentCommand>
{
    public async Task Handle(RemoveDeploymentCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.RemoveDeployment(request.Namespace, request.DeploymentName);
    }
}
