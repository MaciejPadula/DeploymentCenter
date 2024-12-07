using DeploymentCenter.Volumes.Features.CreateVolume.Contract;
using MediatR;

namespace DeploymentCenter.Volumes.Features.CreateVolume;

internal class CreateVolumeHandler(IVolumeClient volumeClient) : IRequestHandler<CreateVolumeCommand>
{
    public async Task Handle(CreateVolumeCommand request, CancellationToken cancellationToken)
    {
        await volumeClient.CreateVolume(request.VolumeName, request.VolumePath, request.CapacityInKibiBytes);
    }
}
