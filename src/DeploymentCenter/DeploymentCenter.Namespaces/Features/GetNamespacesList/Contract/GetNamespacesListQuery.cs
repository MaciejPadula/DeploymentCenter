using MediatR;

namespace DeploymentCenter.Namespaces.Features.GetNamespacesList.Contract;

public readonly record struct GetNamespacesListQuery() : IRequest<List<string>>;
