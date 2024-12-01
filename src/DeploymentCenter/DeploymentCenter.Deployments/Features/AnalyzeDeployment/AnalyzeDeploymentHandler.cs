using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.AnalyzeDeployment.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.AnalyzeDeployment;

internal class AnalyzeDeploymentHandler(IDeploymentClient deploymentClient, IPodClient podClient, IAnalyzeClient analyzeClient) : IRequestHandler<AnalyzeDeploymentQuery, string>
{
    public async Task<string> Handle(AnalyzeDeploymentQuery request, CancellationToken cancellationToken)
    {
        var deploymentInfo = await deploymentClient.GetDetails(request.Namespace, request.DeploymentName);
        var containers = await deploymentClient.GetContainers(request.Namespace, request.DeploymentName);
        var deploymentPods = await podClient.GetPods(request.Namespace, request.DeploymentName);

        var basicDetails = new DeploymentStatusDetails(
            request.DeploymentName,
            deploymentPods.ToDictionary(pod => pod.Name, pod => pod.Status),
            request.AdditionalUserDetails);

        return await analyzeClient.AnalyzeDeploymentStatus(basicDetails);
    }
}
