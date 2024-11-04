using DeploymentCenter.Services.Features.RemoveLoadBalancer.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.RemoveLoadBalancer;

internal class RemoveLoadBalancerHandler(IServiceClient serviceClient) : IRequestHandler<RemoveLoadBalancerCommand>
{
    public async Task Handle(RemoveLoadBalancerCommand request, CancellationToken cancellationToken)
    {
        await serviceClient.RemoveLoadBalancer(request.Namespace, request.Name);
    }
}
