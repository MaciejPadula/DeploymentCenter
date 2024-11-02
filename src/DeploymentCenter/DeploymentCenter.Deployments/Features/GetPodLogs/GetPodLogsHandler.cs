using DeploymentCenter.Deployments.Features.GetPodLogs.Contract;
using DeploymentCenter.Deployments.Shared;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetPodLogs;

internal class GetPodLogsHandler : IRequestHandler<GetPodLogsQuery, string>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetPodLogsHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<string> Handle(GetPodLogsQuery request, CancellationToken cancellationToken)
    {
        return await _deploymentClient.GetPodLogs(request.Namespace, request.PodName);
    }
}
