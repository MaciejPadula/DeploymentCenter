using DeploymentCenter.Pods.Core.Models;

namespace DeploymentCenter.Pods.Features;

public interface IPodClient
{
    Task<List<Pod>> GetPods(string @namespace, string namePrefix);
    Task<string> GetPodLogs(string @namespace, string podName);
    Task RemovePod(string @namespace, string podName);
}
