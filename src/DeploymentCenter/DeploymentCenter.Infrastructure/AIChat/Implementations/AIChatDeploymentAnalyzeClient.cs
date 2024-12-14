using DeploymentCenter.Deployments.Features.AnalyzeDeployment;
using System.Text.Json;

namespace DeploymentCenter.Infrastructure.AIChat.Implementations;

internal class AIChatDeploymentAnalyzeClient(IAIChatProvider chatProvider) : IDeploymentAnalyzeClient
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
        var volumesJson = JsonSerializer.Serialize(deploymentStatusDetails.Volumes);

        var chatHistory = new PromptBuilder()
            .WithResultFormat("MARKDOWN")
            .WithUserLanguage("provided from user")
            .AsProfessionalDevopsEngineerYouAreSupposedTo(
                """
                Answer user question about deployment provided in system data.
                """)
            .WithParameter("Deployment Details", deploymentJson)
            .WithParameter("Pods Details", podsJson)
            .WithParameter("Containers Details", containersJson)
            .WithParameter("Volumes Details", volumesJson)
            .Build(deploymentStatusDetails.UserQuestion);

        return await chatClient.CompleteChatAsync(chatHistory);
    }
}
