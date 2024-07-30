using DeploymentCenter.Services.Contract.Models;

namespace DeploymentCenter.Services.Infrastructure;

public interface IServiceClient
{
    Task CreateLoadBalancer(LoadBalancer loadBalancer);
}
