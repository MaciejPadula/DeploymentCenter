using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

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
