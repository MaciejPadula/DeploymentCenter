using DeploymentCenter.Namespaces.Features.GetNamespacesList.Contract;
using MediatR;

namespace DeploymentCenter.Namespaces.Features.GetNamespacesList;

internal class GetNamespacesListHandler(INamespaceClient namespaceClient) : IRequestHandler<GetNamespacesListQuery, List<string>>
{
    public async Task<List<string>> Handle(GetNamespacesListQuery request, CancellationToken cancellationToken)
    {
        return await namespaceClient.GetNamespaces();
    }
}
