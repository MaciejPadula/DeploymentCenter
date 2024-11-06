using MediatR;

namespace DeploymentCenter.Namespaces.Features.RemoveNamespace.Contract;

public record RemoveNamespaceCommand(string Name) : IRequest;
