﻿using DeploymentCenter.AIChat.Core.Exceptions;
using DeploymentCenter.AIChat.Core.Models;
using DeploymentCenter.AIChat.Features;
using DeploymentCenter.AIChat.Features.CompleteChat;
using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using FluentAssertions;
using Microsoft.Extensions.Caching.Memory;
using NSubstitute;

namespace DeploymentCenter.AIChat.Tests.Features.CompleteChat;

internal class CompleteChatHandlerTests
{
    private CompleteChatHandler _sut;
    private IAIChatProvider _aIChatProvider;
    private IMemoryCache _memoryCache;
    private IChatClient _chatClient;

    [SetUp]
    public void Setup()
    {
        _aIChatProvider = Substitute.For<IAIChatProvider>();
        _memoryCache = Substitute.For<IMemoryCache>();
        _chatClient = Substitute.For<IChatClient>();
        _sut = new CompleteChatHandler(
            _aIChatProvider,
            _memoryCache);
    }

    [TearDown]
    public void TearDown()
    {
        _memoryCache.Dispose();
    }

    [Test]
    public async Task Handle_WhenChatClientIsNotInitialized_ReturnsAIClientNotInitializedException()
    {
        // Arrange
        _aIChatProvider.IsChatClientInitialized.Returns(false);

        // Act
        var result = await _sut.Handle(new CompleteChatQuery("test", []), CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error?.Exception.Should().BeOfType<AIClientNotInitializedException>();
    }

    [Test]
    public async Task Handle_WhenChatClientIsInitialized_ReturnsChatClientResponse()
    {
        // Arrange
        _aIChatProvider.IsChatClientInitialized.Returns(true);
        _aIChatProvider.GetChatClient().Returns(_chatClient);
        _chatClient.CompleteChatAsync(Arg.Any<IEnumerable<Message>>()).Returns("testResult");

        // Act
        var result = await _sut.Handle(new CompleteChatQuery("test", []), CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be("testResult");
    }
}
