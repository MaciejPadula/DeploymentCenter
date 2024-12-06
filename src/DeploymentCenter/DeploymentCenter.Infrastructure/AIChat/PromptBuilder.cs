namespace DeploymentCenter.Infrastructure.AIChat;

internal class PromptBuilder
{
    private readonly List<Message> _chatHistory = [];

    public PromptBuilder WithBasePrompt(string basePrompt)
    {
        _chatHistory.Add(new Message(basePrompt, MessageSender.Prompt));
        return this;
    }

    public PromptBuilder WithParameter(string parameterName, string parameterValue)
    {
        _chatHistory.Add(new Message($"{parameterName}: {parameterValue}", MessageSender.Prompt));
        return this;
    }

    public PromptBuilder WithResultFormat(string format)
    {
        _chatHistory.Add(new Message($"Your response should be returned in {format} format!!!", MessageSender.Prompt));
        return this;
    }

    public PromptBuilder WithUserLanguage(string language)
    {
        _chatHistory.Add(new Message($"Your answer should be written in the {language} language", MessageSender.Prompt));
        return this;
    }

    public List<Message> Build(string? userInput = null)
    {
        if (userInput is not null)
        {
            _chatHistory.Add(new Message($"User Question: {userInput}", MessageSender.User));
        }

        return [.. _chatHistory];
    }
}
