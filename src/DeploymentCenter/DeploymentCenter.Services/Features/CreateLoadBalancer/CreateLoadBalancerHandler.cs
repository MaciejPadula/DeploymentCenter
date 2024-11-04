using DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.CreateLoadBalancer;

internal class CreateLoadBalancerHandler(IServiceClient serviceClient) : IRequestHandler<CreateLoadBalancerCommand>
{
    public async Task Handle(CreateLoadBalancerCommand request, CancellationToken cancellationToken)
    {
        await serviceClient.CreateLoadBalancer(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Ports,
            request.ExternalIps));
    }
}
