using DeploymentCenter.Volumes.Core.Models;

namespace DeploymentCenter.Volumes.Features;

public interface IVolumeClient
{
    Task<List<Volume>> GetVolumes();
    Task CreateVolume(string volumeName, string volumePath, int capacityInKibiBytes);
    Task DeleteVolume(string volumeName);
}
