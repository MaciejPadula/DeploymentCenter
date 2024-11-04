using MediatR;

namespace DeploymentCenter.Namespaces.Features.CreateNamespace.Contract;

public record CreateNamespaceCommand(string Name) : IRequest;