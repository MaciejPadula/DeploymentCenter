using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Infrastructure;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class RemoveLoadBalancerHandler(IServiceClient serviceClient) : IRequestHandler<RemoveLoadBalancerCommand>
{
    public async Task Handle(RemoveLoadBalancerCommand request, CancellationToken cancellationToken)
    {
        await serviceClient.RemoveLoadBalancer(request.Namespace, request.Name);
    }
}
