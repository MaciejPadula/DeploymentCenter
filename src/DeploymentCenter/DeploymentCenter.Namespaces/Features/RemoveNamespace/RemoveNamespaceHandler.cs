using DeploymentCenter.Namespaces.Features.RemoveNamespace.Contract;
using MediatR;

namespace DeploymentCenter.Namespaces.Features.RemoveNamespace;

internal class RemoveNamespaceHandler(INamespaceClient namespaceClient) : IRequestHandler<RemoveNamespaceCommand>
{
    public async Task Handle(RemoveNamespaceCommand request, CancellationToken cancellationToken)
    {
        await namespaceClient.RemoveNamespace(request.Name);
    }
}
