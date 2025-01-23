using DeploymentCenter.Pods.Features;
using DeploymentCenter.Pods.Features.GetPodLogs.Contract;
using MediatR;

namespace DeploymentCenter.Pods.Features.GetPodLogs;

internal class GetPodLogsHandler(IPodClient podClient) : IRequestHandler<GetPodLogsQuery, string>
{
    public async Task<string> Handle(GetPodLogsQuery request, CancellationToken cancellationToken)
    {
        return await podClient.GetPodLogs(request.Namespace, request.PodName);
    }
}
