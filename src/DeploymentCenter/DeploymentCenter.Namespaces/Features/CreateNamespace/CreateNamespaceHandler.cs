using DeploymentCenter.Namespaces.Features.CreateNamespace.Contract;
using MediatR;

namespace DeploymentCenter.Namespaces.Features.CreateNamespace;

internal class CreateNamespaceHandler(INamespaceClient namespaceClient) : IRequestHandler<CreateNamespaceCommand>
{
    public async Task Handle(CreateNamespaceCommand request, CancellationToken cancellationToken)
    {
        await namespaceClient.CreateNamespace(request.Name);
    }
}
