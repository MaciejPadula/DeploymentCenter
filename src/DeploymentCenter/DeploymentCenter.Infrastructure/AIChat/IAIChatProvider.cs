using OpenAI.Chat;

namespace DeploymentCenter.Infrastructure.AIChat;

internal interface IAIChatProvider
{
    ChatClient? GetChatClient();
}
