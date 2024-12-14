using DeploymentCenter.AIChat.Core.Helpers;
using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using DeploymentCenter.Assistant.Core.Extensions;
using DeploymentCenter.Deployments.Features.AnalyzeDeployment;
using DeploymentCenter.Services.Features.AnalyzeLoadBalancer.Contract;
using DeploymentCenter.Services.Features.GetLoadBalancerDetails.Contract;
using DeploymentCenter.Services.Features.GetLoadBalancerIpAddresses.Contract;
using DeploymentCenter.Services.Features.GetLoadBalancerPorts.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;
using System.Text.Json;

namespace DeploymentCenter.Services.Features.AnalyzeLoadBalancer;

internal class AnalyzeLoadBalancerHandler(IMediator mediator) : IRequestHandler<AnalyzeLoadBalancerQuery, Result<string>>
{
    public async Task<Result<string>> Handle(AnalyzeLoadBalancerQuery request, CancellationToken cancellationToken)
    {
        var detailsTask = mediator.Send(new GetLoadBalancerDetailsQuery(request.Namespace, request.LoadBalancerName), cancellationToken);
        var portsTask = mediator.Send(new GetLoadBalancerPortsQuery(request.Namespace, request.LoadBalancerName), cancellationToken);
        var ipAddresses = await mediator.Send(new GetLoadBalancerIpAddressesQuery(request.Namespace, request.LoadBalancerName), cancellationToken);

        var detailsJson = JsonSerializer.Serialize(await detailsTask);
        var ipAddressesJson = JsonSerializer.Serialize(ipAddresses.Select(x => x.ToString()));
        var portsJson = JsonSerializer.Serialize(await portsTask);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .AsProfessionalDevopsEngineerYouAreSupposedTo(
                """
                Answer user question about load balancer provided in system data.
                """)
            .WithParameter("Load Balancer Details", detailsJson)
            .WithParameter("Ip Addresses", ipAddressesJson)
            .WithParameter("Ports", portsJson)
            .Build(request.UserQuestion);

        var queryKey = $"{nameof(AnalyzeDeploymentHandler)}_{request.Namespace}_{request.LoadBalancerName}_{request.UserQuestion}";

        return await mediator.Send(new CompleteChatQuery(queryKey, chatHistory), cancellationToken);
    }
}
