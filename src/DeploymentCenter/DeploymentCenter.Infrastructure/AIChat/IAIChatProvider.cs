namespace DeploymentCenter.Infrastructure.AIChat;

internal interface IAIChatProvider
{
    IChatClient? GetChatClient();
}
