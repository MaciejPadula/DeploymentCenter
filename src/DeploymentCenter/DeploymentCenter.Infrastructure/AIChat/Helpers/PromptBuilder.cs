namespace DeploymentCenter.Infrastructure.AIChat.Helpers;

internal class PromptBuilder
{
    private readonly List<Message> _chatHistory = [];

    public PromptBuilder AsProfessionalDevopsEngineerYouAreSupposedTo(string input)
    {
        return WithBasePrompt(
            $"""
            You are professional DevOps Engineer and you are working on a deployment.
            Answer user question only if question is related to kubernetes cluster.
            If user asks any other question, provide the answer that you are not able to answer this question.
            As a professional DevOps Engineer, you are supposed to provide the answer to the user question.
            {input}
            """);
    }

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
