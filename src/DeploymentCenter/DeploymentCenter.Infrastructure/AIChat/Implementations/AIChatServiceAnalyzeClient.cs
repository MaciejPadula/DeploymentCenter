using DeploymentCenter.Services.Features.AnalyzeLoadBalancer;
using System.Text.Json;

namespace DeploymentCenter.Infrastructure.AIChat.Implementations;

internal class AIChatServiceAnalyzeClient(IAIChatProvider chatProvider) : IServiceAnalyzeClient
{
    public async Task<string> AnalyzeLoadBalancer(LoadBalancerAnalyzeContext analyzeContext)
    {
        var chatClient = chatProvider.GetChatClient();
        if (chatClient is null)
        {
            return string.Empty;
        }

        var detailsJson = JsonSerializer.Serialize(analyzeContext.Details);
        var addressesJson = JsonSerializer.Serialize(analyzeContext.Addresses);
        var portsJson = JsonSerializer.Serialize(analyzeContext.Ports);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .AsProfessionalDevopsEngineerYouAreSupposedTo(
                """
                Answer user question about load balancer provided in system data.
                """)
            .WithParameter("Load Balancer Details", detailsJson)
            .WithParameter("Ip Addresses", addressesJson)
            .WithParameter("Ports", portsJson)
            .Build(analyzeContext.UserQuestion);

        return await chatClient.CompleteChatAsync(chatHistory);
    }
}
