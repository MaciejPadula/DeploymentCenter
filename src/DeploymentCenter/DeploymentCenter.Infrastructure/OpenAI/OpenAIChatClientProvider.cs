using DeploymentCenter.AIChat.Core.Exceptions;
using DeploymentCenter.AIChat.Features;
using Microsoft.Extensions.Configuration;
using OpenAI;

namespace DeploymentCenter.Infrastructure.OpenAI;

internal class OpenAIChatClientProvider(IConfiguration configuration) : IAIChatProvider
{
    private readonly string? _openAIKey = configuration["OpenAI:Key"];
    private readonly string? _openAIModel = configuration["OpenAI:Model"];

    public bool IsChatClientInitialized => !string.IsNullOrEmpty(_openAIKey)
        && !string.IsNullOrEmpty(_openAIModel);

    public IChatClient GetChatClient()
    {
        if (!IsChatClientInitialized)
        {
            throw new AIClientNotInitializedException();
        }

        var chatClient = new OpenAIClient(_openAIKey).GetChatClient(_openAIModel);
        return new OpenAIChatClient(chatClient);
    }
}
