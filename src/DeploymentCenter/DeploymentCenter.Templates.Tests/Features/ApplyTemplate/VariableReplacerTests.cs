using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Features.ApplyTemplate;
using FluentAssertions;

namespace DeploymentCenter.Templates.Tests.Features.ApplyTemplate;

internal class VariableReplacerTests
{
    private VariableReplacer _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new VariableReplacer();
    }

    [Test]
    public void Replace_WhenVariableIsMappedToSomeVar_ShouldReplaceValue()
    {
        // Arrange
        var template = new Variable("Greetings", "Hello, {name}!");
        var variables = new Dictionary<string, string>
        {
            { "name", "world" }
        };
        var expectedResult = new Dictionary<string, string>
        {
            { "Greetings", "Hello, world!" }
        };

        // Act
        var result = _sut.Replace([template], variables);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }

    [Test]
    public void Replace_WhenVariableIsNotMappedToSomeVar_ShouldReplaceValue()
    {
        // Arrange
        var template = new Variable("Greetings", "Hello, John!");
        var variables = new Dictionary<string, string>
        {
            { "name", "world" }
        };
        var expectedResult = new Dictionary<string, string>
        {
            { "Greetings", "Hello, John!" }
        };

        // Act
        var result = _sut.Replace([template], variables);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }
}
