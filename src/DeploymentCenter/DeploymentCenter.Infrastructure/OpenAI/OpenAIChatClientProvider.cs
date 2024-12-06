using DeploymentCenter.Infrastructure.AIChat;
using Microsoft.Extensions.Configuration;
using OpenAI;

namespace DeploymentCenter.Infrastructure.OpenAI;

internal class OpenAIChatClientProvider(IConfiguration configuration) : IAIChatProvider
{
    public IChatClient? GetChatClient()
    {
        var openAIKey = configuration["OpenAI:Key"];
        var openAIModel = configuration["OpenAI:Model"];

        if (string.IsNullOrEmpty(openAIKey) || string.IsNullOrEmpty(openAIModel))
        {
            return null;
        }

        var chatClient = new OpenAIClient(openAIKey).GetChatClient(openAIModel);
        return new OpenAIChatClient(chatClient);
    }
}
