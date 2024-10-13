using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class RestartDeploymentHandler(IDeploymentClient deploymentClient) : IRequestHandler<RestartDeploymentCommand>
{
    public async Task Handle(RestartDeploymentCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.RestartDeployment(request.Namespace, request.DeploymentName);
    }
}
