using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Infrastructure;
using MediatR;

namespace DeploymentCenter.Services.Features;

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
