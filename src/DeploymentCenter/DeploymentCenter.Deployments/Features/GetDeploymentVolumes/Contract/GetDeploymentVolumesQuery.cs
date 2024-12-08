using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentVolumes.Contract;

public record GetDeploymentVolumesQuery(string Namespace, string DeploymentName) : IRequest<List<DeploymentVolume>>;