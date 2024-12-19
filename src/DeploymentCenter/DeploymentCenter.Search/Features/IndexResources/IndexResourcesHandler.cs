using DeploymentCenter.Search.Features.IndexResources.Contract;
using MediatR;

namespace DeploymentCenter.Search.Features.IndexResources;

internal class IndexResourcesHandler(
    IResourceProvider resourceProvider,
    IResourceIndexer resourceIndexer) : IRequestHandler<IndexResourcesCommand>
{
    public async Task Handle(IndexResourcesCommand request, CancellationToken cancellationToken)
    {
        var resources = await resourceProvider.GetResourcesAsync();
        await resourceIndexer.IndexResourcesAsync(resources);
    }
}
