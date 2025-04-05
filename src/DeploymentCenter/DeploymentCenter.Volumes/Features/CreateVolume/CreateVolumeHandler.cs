using DeploymentCenter.SharedKernel;
using DeploymentCenter.SharedKernel.Exceptions;
using DeploymentCenter.Volumes.Features.CreateVolume.Contract;
using MediatR;

namespace DeploymentCenter.Volumes.Features.CreateVolume;

internal class CreateVolumeHandler(IVolumeClient volumeClient) : IRequestHandler<CreateVolumeCommand, Result>
{
    public async Task<Result> Handle(CreateVolumeCommand request, CancellationToken cancellationToken)
    {
        if (await volumeClient.VolumeExists(request.VolumeName))
        {
            return Result.OnError(new BadRequestException(BadRequestStatusCode.DuplicateName));
        }

        await volumeClient.CreateVolume(request.VolumeName, request.VolumePath, request.CapacityInKibiBytes);

        return Result.OnSuccess();
    }
}
