using DeploymentCenter.Services.Contract.Models;

namespace DeploymentCenter.Services.Infrastructure;

public interface IServiceClient
{
    Task CreateLoadBalancer(LoadBalancer loadBalancer);
    Task<List<string>> GetLoadBalancerIpAddresses(string @namespace, string loadBalancerName);
    Task<LoadBalancerDetails?> GetLoadBalancerDetails(string @namespace, string loadBalancerName);
    Task<List<LoadBalancerPort>> GetLoadBalancerPorts(string @namespace, string loadBalancerName);
    Task<List<LoadBalancerBasicInfo>> GetLoadBalancersBasicInfos(string @namespace);
    Task RemoveLoadBalancer(string @namespace, string name);
}
