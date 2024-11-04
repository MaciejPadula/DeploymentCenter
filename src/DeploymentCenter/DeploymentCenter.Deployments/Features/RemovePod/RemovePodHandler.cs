using DeploymentCenter.Deployments.Features.RemovePod.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.RemovePod;

internal class RemovePodHandler(IPodClient podClient) : IRequestHandler<RemovePodCommand>
{
    public async Task Handle(RemovePodCommand request, CancellationToken cancellationToken)
    {
        await podClient.RemovePod(request.Namespace, request.PodName);
    }
}
