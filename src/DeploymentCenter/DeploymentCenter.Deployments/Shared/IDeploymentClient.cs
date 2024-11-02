using DeploymentCenter.Deployments.Shared.Models;

namespace DeploymentCenter.Deployments.Shared;

public interface IDeploymentClient
{
    Task CreateDeployment(Deployment deployment);
    Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName);
    Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace);
    Task<List<Container>> GetContainers(string @namespace, string deploymentName);
    Task<List<Pod>> GetPods(string @namespace, string deploymentName);
    Task<string> GetPodLogs(string @namespace, string podName);
    Task<List<ContainerMetrics>> GetDeploymentStatistics(string @namespace, string deploymentName);
    Task<bool> AreMetricsAvailable();
    Task RestartDeployment(string @namespace, string deploymentName);
    Task ScaleDeployment(string @namespace, string deploymentName, int replicas);
    Task RemoveDeployment(string @namespace, string deploymentName);
    Task RemovePod(string @namespace, string podName);
}
