using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Infrastructure;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class CreateLoadBalancerHandler : IRequestHandler<CreateLoadBalancerCommand>
{
    private readonly IServiceClient _serviceClient;

    public CreateLoadBalancerHandler(IServiceClient serviceClient)
    {
        _serviceClient = serviceClient;
    }

    public async Task Handle(CreateLoadBalancerCommand request, CancellationToken cancellationToken)
    {
        await _serviceClient.CreateLoadBalancer(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Ports,
            request.ExternalIps));
    }
}
