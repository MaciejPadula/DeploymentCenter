using DeploymentCenter.Deployments.Features.RestartDeployment.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.RestartDeployment;

internal class RestartDeploymentHandler(IDeploymentClient deploymentClient) : IRequestHandler<RestartDeploymentCommand>
{
    public async Task Handle(RestartDeploymentCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.RestartDeployment(request.Namespace, request.DeploymentName);
    }
}
