using DeploymentCenter.AIChat.Core.Models;

namespace DeploymentCenter.AIChat.Features;

public interface IChatClient
{
    public Task<string> CompleteChatAsync(IEnumerable<Message> messages);
}
