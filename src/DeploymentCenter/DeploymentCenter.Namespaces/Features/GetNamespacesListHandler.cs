using DeploymentCenter.Namespaces.Features.Contract;
using DeploymentCenter.Namespaces.Features.Shared;
using MediatR;

namespace DeploymentCenter.Namespaces.Features;

internal class GetNamespacesListHandler(INamespaceClient namespaceClient) : IRequestHandler<GetNamespacesListQuery, List<string>>
{
    public async Task<List<string>> Handle(GetNamespacesListQuery request, CancellationToken cancellationToken)
    {
        return await namespaceClient.GetNamespaces();
    }
}
