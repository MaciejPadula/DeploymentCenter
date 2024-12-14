using DeploymentCenter.AIChat.Core.Models;
using DeploymentCenter.AIChat.Features;
using OpenAI.Chat;

namespace DeploymentCenter.Infrastructure.OpenAI;

internal class OpenAIChatClient(ChatClient chatClient) : IChatClient
{
    public async Task<string> CompleteChatAsync(IEnumerable<Message> messages)
    {
        var chatMessages = messages
            .Select(Map)
            .ToList();

        var result = await chatClient.CompleteChatAsync(chatMessages);
        var content = result.Value.Content;
        return string.Join(Environment.NewLine, content.Select(x => x.Text));
    }

    private static ChatMessage Map(Message message) => message.Sender switch
    {
        MessageSender.Prompt => new SystemChatMessage(message.Content),
        MessageSender.User => new UserChatMessage(message.Content),
        MessageSender.Bot => new AssistantChatMessage(message.Content),
        _ => throw new InvalidOperationException($"Unknown message sender: {message.Sender}")
    };
}
