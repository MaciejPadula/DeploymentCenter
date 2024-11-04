using DeploymentCenter.Deployments.Core.Models;

namespace DeploymentCenter.Deployments.Features;

public interface IPodClient
{
    Task<List<Pod>> GetPods(string @namespace, string deploymentName);
    Task<string> GetPodLogs(string @namespace, string podName);
    Task RemovePod(string @namespace, string podName);
}
