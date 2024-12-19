using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.IndexResources;

namespace DeploymentCenter.Infrastructure.Elastic;

internal class ElasticResourceIndexer : IResourceIndexer
{
    public Task IndexResourcesAsync(IEnumerable<Resource> resources)
    {
        throw new NotImplementedException();
    }
}
