namespace DeploymentCenter.AIChat.Features;

public interface IAIChatProvider
{
    bool IsChatClientInitialized { get; }
    IChatClient GetChatClient();
}
