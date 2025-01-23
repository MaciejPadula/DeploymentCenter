using DeploymentCenter.Pods.Core.Models;
using DeploymentCenter.Pods.Features.GetPods.Contract;
using MediatR;

namespace DeploymentCenter.Pods.Features.GetPods;

internal class GetPodsHandler(IPodClient podClient) : IRequestHandler<GetPodsQuery, List<Pod>>
{
    public async Task<List<Pod>> Handle(GetPodsQuery request, CancellationToken cancellationToken)
    {
        return await podClient.GetPods(
            request.Namespace,
            request.NamePrefix);
    }
}
