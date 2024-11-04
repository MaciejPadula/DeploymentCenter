using MediatR;

namespace DeploymentCenter.Services.Features.RemoveLoadBalancer.Contract;

public record RemoveLoadBalancerCommand(
    string Namespace,
    string Name) : IRequest;