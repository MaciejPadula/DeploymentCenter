using MediatR;

namespace DeploymentCenter.Services.Contract.Features;

public record RemoveLoadBalancerCommand(
    string Namespace,
    string Name) : IRequest;