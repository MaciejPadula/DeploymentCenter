using DeploymentCenter.AIChat.Core.Helpers;
using DeploymentCenter.AIChat.Core.Models;
using FluentAssertions;

namespace DeploymentCenter.AIChat.Tests.Core.Helpers;

internal class PromptBuilderTests
{
    [Test]
    public void WithBasePrompt_ShouldAddBasePromptToChatHistory()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var basePrompt = "Hello, how can I help you today?";
        var expectedChat = new List<Message>
        {
            new(basePrompt, MessageSender.Prompt)
        };

        // Act
        var result = promptBuilder
            .WithBasePrompt(basePrompt)
            .Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void WithParameter_ShouldAddParameterToChatHistory()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var parameterName = "Name";
        var parameterValue = "John Doe";
        var expectedChat = new List<Message>
        {
            new($"{parameterName}: {parameterValue}", MessageSender.Prompt)
        };

        // Act
        var result = promptBuilder
            .WithParameter(parameterName, parameterValue)
            .Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void WithResultFormat_ShouldAddResultFormatToChatHistory()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var format = "JSON";
        var expectedChat = new List<Message>
        {
            new($"Your response should be returned in {format} format!!!", MessageSender.Prompt)
        };

        // Act
        var result = promptBuilder
            .WithResultFormat(format)
            .Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void WithUserLanguage_ShouldAddUserLanguageToChatHistory()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var language = "English";
        var expectedChat = new List<Message>
        {
            new($"Your answer should be written in the {language} language. If you can't determine language use english!!!", MessageSender.Prompt)
        };

        // Act
        var result = promptBuilder
            .WithUserLanguage(language)
            .Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void Build_WithoutUserInput_ShouldReturnChatHistory()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var expectedChat = new List<Message>();

        // Act
        var result = promptBuilder.Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void Build_WithUserInput_ShouldReturnChatHistoryWithUserInput()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var userInput = "How do I reset my password?";
        var expectedChat = new List<Message>
        {
            new($"User Question: {userInput}", MessageSender.User)
        };

        // Act
        var result = promptBuilder.Build(userInput);

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void Build_WithUserInput_ShouldReturnChatHistoryWithUserInputAndPrompt()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var userInput = "How do I reset my password?";
        var basePrompt = "Hello, how can I help you today?";
        var expectedChat = new List<Message>
        {
            new(basePrompt, MessageSender.Prompt),
            new($"User Question: {userInput}", MessageSender.User)
        };

        // Act
        var result = promptBuilder
            .WithBasePrompt(basePrompt)
            .Build(userInput);

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }

    [Test]
    public void Build_WithMultiplePrompts_ShouldReturnChatHistoryWithAllPrompts()
    {
        // Arrange
        var promptBuilder = new PromptBuilder();
        var basePrompt = "Hello, how can I help you today?";
        var parameterName = "Name";
        var parameterValue = "John Doe";
        var format = "JSON";
        var language = "English";
        var expectedChat = new List<Message>
        {
            new(basePrompt, MessageSender.Prompt),
            new($"{parameterName}: {parameterValue}", MessageSender.Prompt),
            new($"Your response should be returned in {format} format!!!", MessageSender.Prompt),
            new($"Your answer should be written in the {language} language. If you can't determine language use english!!!", MessageSender.Prompt)
        };

        // Act
        var result = promptBuilder
            .WithBasePrompt(basePrompt)
            .WithParameter(parameterName, parameterValue)
            .WithResultFormat(format)
            .WithUserLanguage(language)
            .Build();

        // Assert
        result.Should().BeEquivalentTo(expectedChat);
    }
}
