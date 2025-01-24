using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources;

namespace DeploymentCenter.Search.Tests;

internal class FuzzySearchScoreCalculatorTests
{
    private FuzzySearchScoreCalculator _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new FuzzySearchScoreCalculator();
    }

    [Test]
    public void CalculateGroupScore_WhenResourcesPassed_ShouldReturnMedianScore()
    {
        // Arrange
        var resources = new List<ScoreWithResource>
        {
            new(new("test-name-deploy", ResourceType.Deployment, "test-namespace"), 90),
            new(new("test-name-lb", ResourceType.LoadBalancer, "test-namespace"), 90),
            new(new("test-name-job", ResourceType.CronJob, "test-namespace"), 22),
            new(new("job", ResourceType.CronJob, "test-namespace"), 79),
            new(new("job2", ResourceType.CronJob, "test-namespace"), 10),
            new(new("test-name-deploy2", ResourceType.Deployment, "test-namespace"), 89),
            new(new("test-name-deploy3", ResourceType.Deployment, "test-namespace2"), 90),
            new(new("test-name-deploy4", ResourceType.Deployment, "test-namespace2"), 21),
        };

        // Act
        var result = _sut.CalculateGroupScore(resources);

        // Assert
        Assert.That(result, Is.EqualTo(84));
    }

    [Test]
    [TestCase("test-name-deploy", 100)]
    [TestCase("test-name", 100)]
    [TestCase("deploy", 100)]
    [TestCase("test-name-deplyo", 94)]
    [TestCase("test-name-dloy", 86)]
    public void CalculateScore_WhenQueryPhraseAndResourcePassed_ShouldReturnScoreWithResource(string queryPhrase, int expectedScore)
    {
        // Arrange
        var resource = new Resource("test-name-deploy", ResourceType.Deployment, "test-namespace");

        // Act
        var result = _sut.CalculateScore(queryPhrase, resource);

        // Assert
        Assert.That(result.Resource, Is.EqualTo(resource));
        Assert.That(result.SearchScore, Is.EqualTo(expectedScore));
    }
}
