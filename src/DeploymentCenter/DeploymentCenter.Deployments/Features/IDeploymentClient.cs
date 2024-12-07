using DeploymentCenter.Deployments.Core.Models;

namespace DeploymentCenter.Deployments.Features;

public interface IDeploymentClient
{
    Task CreateDeployment(Deployment deployment);
    Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName);
    Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace);
    Task<List<Container>> GetContainers(string @namespace, string deploymentName);
    Task<bool> DeploymentExists(string @namespace, string deploymentName);
    Task RestartDeployment(string @namespace, string deploymentName);
    Task ScaleDeployment(string @namespace, string deploymentName, int replicas);
    Task RemoveDeployment(string @namespace, string deploymentName);
    Task UpdateEnvironmentVariables(string @namespace, string deploymentName, string containerName, List<EnvironmentVariable> environmentVariables);
    Task ConnectVolume(string @namespace, string deploymentName, string volumeName, string containerName, string mountPath);
}
