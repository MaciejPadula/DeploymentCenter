namespace DeploymentCenter.AIChat.Features;

public interface IAIChatProvider
{
    IChatClient? GetChatClient();
}
