using DeploymentCenter.Services.Core.Models;

namespace DeploymentCenter.Services.Features;

public interface IServiceClient
{
    Task<bool> RunCronJob(string @namespace, string cronJobName);
    Task CreateLoadBalancer(LoadBalancer loadBalancer);
    Task CreateCronJob(CronJob cronJob);
    Task<List<CronJobBasicInfo>> GetCronJobsBasicInfos(string @namespace);
    Task<CronJobDetails?> GetCronJobDetails(string @namespace, string cronJobName);
    Task<List<string>> GetLoadBalancerIpAddresses(string @namespace, string loadBalancerName);
    Task<LoadBalancerDetails?> GetLoadBalancerDetails(string @namespace, string loadBalancerName);
    Task<List<LoadBalancerPort>> GetLoadBalancerPorts(string @namespace, string loadBalancerName);
    Task<List<LoadBalancerBasicInfo>> GetLoadBalancersBasicInfos(string @namespace);
    Task RemoveLoadBalancer(string @namespace, string name);
    Task<bool> LoadBalancerExists(string @namespace, string name);
}
