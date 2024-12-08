using DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentVolumes;

internal class GetDeploymentVolumesHandler(IDeploymentClient deploymentClient) : IRequestHandler<GetDeploymentVolumesQuery, List<DeploymentVolume>>
{
    public async Task<List<DeploymentVolume>> Handle(GetDeploymentVolumesQuery request, CancellationToken cancellationToken)
    {
        return await deploymentClient.GetDeploymentVolumes(request.Namespace, request.DeploymentName);
    }
}
