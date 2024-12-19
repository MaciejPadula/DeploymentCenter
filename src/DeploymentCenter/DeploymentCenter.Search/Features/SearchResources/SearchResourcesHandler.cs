using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources.Contract;
using MediatR;

namespace DeploymentCenter.Search.Features.SearchResources;

internal class SearchResourcesHandler(ISearchQueryExecutor searchQueryExecutor) : IRequestHandler<SearchResourcesQuery, List<Resource>>
{
    public async Task<List<Resource>> Handle(SearchResourcesQuery request, CancellationToken cancellationToken)
    {
        return await searchQueryExecutor.ExecuteQueryAsync(request.QueryPhrase);
    }
}
