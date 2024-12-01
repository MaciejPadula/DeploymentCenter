using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features;
using Microsoft.Extensions.Caching.Memory;
using OpenAI.Chat;
using System.Text;

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

        List<ChatMessage> chatHistory =
        [
            new SystemChatMessage(
                """
                You are professional DevOps Engineer and you are working on a deployment.
                Look at the status of deployment pods and provide the analysis. If all pods are healthy, tell user that everything is alright.
                If any pod is unhealthy, provide the pod name, health status, reason and message and probable solution.
                Return result in Markdown Format.
                """),
            new UserChatMessage($"Deployment Name: {deploymentStatusDetails.DeploymentName}"),
            new UserChatMessage($"Pods Statuses: {GetPodStatuses(deploymentStatusDetails.PodsStatuses)}"),
            new UserChatMessage($"Additional Details: {deploymentStatusDetails.UserAdditionalDetails}"),
        ];

        var result = await chatClient.CompleteChatAsync(chatHistory);
        var content = result.Value.Content;
        return string.Join("\n", content.Select(x => x.Text));
    }

    private static string GetPodStatuses(Dictionary<string, PodStatus> podsStatuses)
    {
        var sb = new StringBuilder();

        foreach (var podStatus in podsStatuses)
        {
            sb.Append($"Pod Name: {podStatus.Key}, Health: {podStatus.Value.Health.ToString()}");
            if (!string.IsNullOrEmpty(podStatus.Value.Reason) && !string.IsNullOrEmpty(podStatus.Value.Message))
            {
                sb.Append($", Reason: {podStatus.Value.Reason}, Message: {podStatus.Value.Message}");
            }
            sb.AppendLine();
        }

        return sb.ToString();
    }
}
