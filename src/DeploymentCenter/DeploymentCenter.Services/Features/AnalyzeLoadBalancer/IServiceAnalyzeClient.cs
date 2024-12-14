namespace DeploymentCenter.Services.Features.AnalyzeLoadBalancer;

public interface IServiceAnalyzeClient
{
    Task<string> AnalyzeLoadBalancer(LoadBalancerAnalyzeContext analyzeContext);
}
