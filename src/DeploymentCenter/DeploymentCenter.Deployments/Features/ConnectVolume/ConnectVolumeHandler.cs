using DeploymentCenter.Deployments.Features.ConnectVolume.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.ConnectVolume;

internal class ConnectVolumeHandler(IDeploymentClient deploymentClient) : IRequestHandler<ConnectVolumeCommand>
{
    public async Task Handle(ConnectVolumeCommand request, CancellationToken cancellationToken)
    {
        await deploymentClient.ConnectVolume(
            request.Namespace,
            request.DeploymentName,
            request.VolumeName,
            request.ContainerName,
            request.MountPath);
    }
}
