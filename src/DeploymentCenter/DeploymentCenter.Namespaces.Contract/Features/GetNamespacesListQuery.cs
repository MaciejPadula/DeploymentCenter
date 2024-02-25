using MediatR;

namespace DeploymentCenter.Namespaces.Contract.Features;

public readonly record struct GetNamespacesListQuery() : IRequest<List<string>>;
