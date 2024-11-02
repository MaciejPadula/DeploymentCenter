using MediatR;

namespace DeploymentCenter.Namespaces.Features.Contract;

public readonly record struct GetNamespacesListQuery() : IRequest<List<string>>;
