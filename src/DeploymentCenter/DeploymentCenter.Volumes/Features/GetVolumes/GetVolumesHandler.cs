using DeploymentCenter.Volumes.Core.Models;
using DeploymentCenter.Volumes.Features.GetVolumes.Contract;
using MediatR;

namespace DeploymentCenter.Volumes.Features.GetVolumes;

internal class GetVolumesHandler(IVolumeClient volumeClient) : IRequestHandler<GetVolumesQuery, List<Volume>>
{
    public async Task<List<Volume>> Handle(GetVolumesQuery request, CancellationToken cancellationToken)
    {
        return await volumeClient.GetVolumes();
    }
}
