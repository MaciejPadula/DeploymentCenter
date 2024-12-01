using DeploymentCenter.Services.Core.Exceptions;
using DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Services.Features.CreateLoadBalancer;

internal class CreateLoadBalancerHandler(IServiceClient serviceClient) : IRequestHandler<CreateLoadBalancerCommand, Result>
{
    public async Task<Result> Handle(CreateLoadBalancerCommand request, CancellationToken cancellationToken)
    {
        if (request.Ports.Count == 0)
        {
            return Result.OnError(new BadRequestException(ServicesStatusCode.PortsRequired));
        }

        if (await serviceClient.LoadBalancerExists(request.Namespace, request.Name))
        {
            return Result.OnError(new BadRequestException(ServicesStatusCode.Duplicate));
        }

        await serviceClient.CreateLoadBalancer(new(
            request.Namespace,
            request.Name,
            request.ApplicationName,
            request.Ports,
            request.ExternalIps));

        return Result.OnSuccess();
    }
}
