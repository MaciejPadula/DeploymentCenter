using DeploymentCenter.Deployments.Core.Models;

namespace DeploymentCenter.Deployments.Features;

public interface IAnalyzeClient
{
    Task<string> AnalyzeDeploymentStatus(DeploymentStatusDetails deploymentStatusDetails);
}
