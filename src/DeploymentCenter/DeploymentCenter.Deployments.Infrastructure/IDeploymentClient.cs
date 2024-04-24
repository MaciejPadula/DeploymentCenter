using DeploymentCenter.Deployments.Contract.Models;

namespace DeploymentCenter.Deployments.Infrastructure;

public interface IDeploymentClient
{
    Task CreateDeployment(Deployment deployment);
    Task<DeploymentDetails?> GetDetails(string @namespace, string deploymentName);
    Task<List<DeploymentBasicInfo>> GetBasicInfos(string @namespace);
    Task<List<Container>> GetContainers(string @namespace, string deploymentName);
    Task<List<Pod>> GetPods(string @namespace, string deploymentName);
}
