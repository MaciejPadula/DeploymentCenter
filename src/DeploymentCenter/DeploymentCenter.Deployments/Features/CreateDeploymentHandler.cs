using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

internal class CreateDeploymentHandler : IRequestHandler<CreateDeploymentCommand>
{
    private readonly IDeploymentClient _deploymentClient;

    public CreateDeploymentHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task Handle(CreateDeploymentCommand request, CancellationToken cancellationToken)
    {
        await _deploymentClient.CreateDeployment(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Replicas,
            request.Containers));
    }
}
