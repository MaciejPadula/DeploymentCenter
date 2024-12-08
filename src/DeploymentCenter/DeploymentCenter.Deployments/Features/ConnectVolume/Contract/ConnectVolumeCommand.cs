using MediatR;

namespace DeploymentCenter.Deployments.Features.ConnectVolume.Contract;

public record ConnectVolumeCommand(string Namespace, string DeploymentName, string VolumeName, string ContainerName, string MountPath) : IRequest;
