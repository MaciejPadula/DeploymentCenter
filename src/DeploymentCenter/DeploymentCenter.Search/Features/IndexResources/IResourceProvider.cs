using DeploymentCenter.Search.Core.Models;

namespace DeploymentCenter.Search.Features.IndexResources;

public interface IResourceProvider
{
    Task<List<Resource>> GetResourcesAsync();
}
