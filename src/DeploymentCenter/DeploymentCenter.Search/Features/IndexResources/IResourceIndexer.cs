using DeploymentCenter.Search.Core.Models;

namespace DeploymentCenter.Search.Features.IndexResources;

public interface IResourceIndexer
{
    Task IndexResourcesAsync(IEnumerable<Resource> resources);
}
