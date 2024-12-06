using DeploymentCenter.Deployments.Features.SetEnvironmentVariables.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.SetEnvironmentVariables;

internal class SetEnvironmentVariablesHandler(IDeploymentClient deploymentClient) : IRequestHandler<SetEnvironmentVariablesCommand>
{
    public async Task Handle(SetEnvironmentVariablesCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.UpdateEnvironmentVariables(
            request.Namespace,
            request.DeploymentName,
            request.ContainerName,
            request.EnvironmentVariables);
    }
}
