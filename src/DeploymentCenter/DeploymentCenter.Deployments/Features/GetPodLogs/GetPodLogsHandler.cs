using DeploymentCenter.Deployments.Features.GetPodLogs.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetPodLogs;

internal class GetPodLogsHandler(IPodClient podClient) : IRequestHandler<GetPodLogsQuery, string>
{
    public async Task<string> Handle(GetPodLogsQuery request, CancellationToken cancellationToken)
    {
        return await podClient.GetPodLogs(request.Namespace, request.PodName);
    }
}
