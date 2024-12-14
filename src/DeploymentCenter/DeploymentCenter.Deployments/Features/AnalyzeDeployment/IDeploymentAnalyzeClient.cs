namespace DeploymentCenter.Deployments.Features.AnalyzeDeployment;

public interface IDeploymentAnalyzeClient
{
    Task<string> AnalyzeDeploymentStatus(DeploymentStatusDetails deploymentStatusDetails);
}
