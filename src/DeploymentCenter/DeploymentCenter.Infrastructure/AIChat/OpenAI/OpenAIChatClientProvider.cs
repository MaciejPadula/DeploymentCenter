using Microsoft.Extensions.Configuration;
using OpenAI;
using OpenAI.Chat;

namespace DeploymentCenter.Infrastructure.AIChat.OpenAI;

internal class OpenAIChatClientProvider(IConfiguration configuration) : IAIChatProvider
{
    public ChatClient? GetChatClient()
    {
        var openAIKey = configuration["OpenAI:Key"];
        var openAIModel = configuration["OpenAI:Model"];

        if (string.IsNullOrEmpty(openAIKey) || string.IsNullOrEmpty(openAIModel))
        {
            return null;
        }

        return new OpenAIClient(openAIKey).GetChatClient(openAIModel);
    }
}
