using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features;
using System.Text.Json;

namespace DeploymentCenter.Infrastructure.AIChat;

internal class AIChatAnalyzeClient(IAIChatProvider chatProvider) : IAnalyzeClient
{
    public async Task<string> AnalyzeDeploymentStatus(DeploymentStatusDetails deploymentStatusDetails)
    {
        var chatClient = chatProvider.GetChatClient();
        if (chatClient is null)
        {
            return string.Empty;
        }

        var deploymentJson = JsonSerializer.Serialize(deploymentStatusDetails.Details);
        var podsJson = JsonSerializer.Serialize(deploymentStatusDetails.Pods);
        var containersJson = JsonSerializer.Serialize(deploymentStatusDetails.Containers);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .WithBasePrompt("""
                You are professional DevOps Engineer and you are working on a deployment.
                Answer user question only if question is related to deployment from system data.
                If user asks any other question, provide the answer that you are not able to answer this question.
                When user question is empty look at the status of deployment pods and provide the analysis.
                If all pods are healthy, tell user that everything is alright.
                If any pod is unhealthy, provide the pod name, health status, reason and message and probable solution.
                """)
            .WithParameter("Deployment Details", deploymentJson)
            .WithParameter("Pods Details", podsJson)
            .WithParameter("Containers Details", containersJson)
            .Build(deploymentStatusDetails.UserQuestion);

        return await chatClient.CompleteChatAsync(chatHistory);
    }
}
