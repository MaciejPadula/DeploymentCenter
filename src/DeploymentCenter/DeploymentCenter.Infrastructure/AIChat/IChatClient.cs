namespace DeploymentCenter.Infrastructure.AIChat;

internal enum MessageSender
{
    Prompt = 0,
    User = 1,
    Bot = 2
}

internal record Message(string Content, MessageSender Sender);

internal interface IChatClient
{
    public Task<string> CompleteChatAsync(IEnumerable<Message> messages);
}
