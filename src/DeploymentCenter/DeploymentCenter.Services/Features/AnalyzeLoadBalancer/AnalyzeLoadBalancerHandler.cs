using DeploymentCenter.Services.Features.AnalyzeLoadBalancer.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.AnalyzeLoadBalancer;

internal class AnalyzeLoadBalancerHandler(IServiceAnalyzeClient serviceAnalyzeClient, IServiceClient serviceClient) : IRequestHandler<AnalyzeLoadBalancerQuery, string>
{
    public async Task<string> Handle(AnalyzeLoadBalancerQuery request, CancellationToken cancellationToken)
    {
        var detailsTask = serviceClient.GetLoadBalancerDetails(request.Namespace, request.LoadBalancerName);
        var ipAddressesTask = serviceClient.GetLoadBalancerIpAddresses(request.Namespace, request.LoadBalancerName);
        var portsTask = serviceClient.GetLoadBalancerPorts(request.Namespace, request.LoadBalancerName);

        var analyzeContext = new LoadBalancerAnalyzeContext(
            await detailsTask,
            await ipAddressesTask,
            await portsTask,
            request.UserQuestion);

        return await serviceAnalyzeClient.AnalyzeLoadBalancer(analyzeContext);
    }
}
