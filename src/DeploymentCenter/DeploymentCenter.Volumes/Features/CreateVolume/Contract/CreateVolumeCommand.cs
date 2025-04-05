using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Volumes.Features.CreateVolume.Contract;

public record CreateVolumeCommand(string VolumeName, string VolumePath, int CapacityInKibiBytes) : IRequest<Result>;