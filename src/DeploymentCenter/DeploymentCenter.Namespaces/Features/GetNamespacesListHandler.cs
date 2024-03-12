using DeploymentCenter.Namespaces.Contract.Features;
using DeploymentCenter.Namespaces.Infrastructure;
using MediatR;

namespace DeploymentCenter.Namespaces.Features;

internal class GetNamespacesListHandler : IRequestHandler<GetNamespacesListQuery, List<string>>
{
    private readonly IKubernetesClientWrapper _kubernetesClient;

    public GetNamespacesListHandler(IKubernetesClientWrapper kubernetesClient)
    {
        _kubernetesClient = kubernetesClient;
    }

    public async Task<List<string>> Handle(GetNamespacesListQuery request, CancellationToken cancellationToken)
    {
        var namespaces = await _kubernetesClient.GetNamespaces();

        return namespaces
            .Items
            .Select(x => x.Metadata.Name)
            .ToList();
    }
}
