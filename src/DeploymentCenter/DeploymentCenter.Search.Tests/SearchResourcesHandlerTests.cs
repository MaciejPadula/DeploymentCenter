using DeploymentCenter.Search.Core.Models;
using DeploymentCenter.Search.Features.SearchResources;
using DeploymentCenter.Search.Features.SearchResources.Contract;
using FluentAssertions;
using NSubstitute;

namespace DeploymentCenter.Search.Tests;

public class SearchResourcesHandlerTests
{
    private ISearchQueryExecutor _searchQueryExecutor;
    private ISearchScoreCalculator _searchScoreCalculator;
    private SearchResourcesHandler _sut;

    [SetUp]
    public void Setup()
    {
        _searchQueryExecutor = Substitute.For<ISearchQueryExecutor>();
        _searchScoreCalculator = Substitute.For<ISearchScoreCalculator>();
        _sut = new SearchResourcesHandler(_searchQueryExecutor, _searchScoreCalculator);
    }

    [Test]
    public async Task Handle_WhenQueryIsPassed_ShouldReturnResources()
    {
        // Arrange
        var searchQuery = "test-naem";
        var query = new SearchResourcesQuery(searchQuery);

        var resources = new List<Resource>
        {
            new("test-name-deploy", ResourceType.Deployment, "test-namespace"),
            new("test-name-lb", ResourceType.LoadBalancer, "test-namespace"),
            new("test-name-job", ResourceType.CronJob, "test-namespace"),
            new("job", ResourceType.CronJob, "test-namespace"),
            new("job2", ResourceType.CronJob, "test-namespace"),
            new("test-name-deploy2", ResourceType.Deployment, "test-namespace"),
            new("test-name-deploy3", ResourceType.Deployment, "test-namespace2"),
        };

        SetupResourceScore(searchQuery, resources[0], 90);
        SetupResourceScore(searchQuery, resources[1], 90);
        SetupResourceScore(searchQuery, resources[2], 90);
        SetupResourceScore(searchQuery, resources[3], 79);
        SetupResourceScore(searchQuery, resources[4], 10);
        SetupResourceScore(searchQuery, resources[5], 89);
        SetupResourceScore(searchQuery, resources[6], 90);

        SetupNamespaceScore("test-namespace", 89);
        SetupNamespaceScore("test-namespace2", 90);

        _searchScoreCalculator
            .CalculateGroupScore(Arg.Any<IEnumerable<ScoreWithResource>>())
            .Returns(x => x.Arg<IEnumerable<ScoreWithResource>>().Select(y => y.SearchScore).Average());

        var expectedResources = new Dictionary<string, List<Resource>>
        {

            {
                "test-namespace2",
                new()
                {
                    new("test-name-deploy3", ResourceType.Deployment, "test-namespace2"),
                }
            },
            {
                "test-namespace",
                new()
                {
                    new("test-name-deploy", ResourceType.Deployment, "test-namespace"),
                    new("test-name-lb", ResourceType.LoadBalancer, "test-namespace"),
                    new("test-name-job", ResourceType.CronJob, "test-namespace"),
                    new("test-name-deploy2", ResourceType.Deployment, "test-namespace"),
                }
            }
        };

        _searchQueryExecutor.QueryAllResources().Returns(resources);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResources, options => options.WithStrictOrdering());
    }

    private void SetupResourceScore(string search, Resource resource, int score)
    {
        _searchScoreCalculator
            .CalculateScore(search, resource)
            .Returns(new ScoreWithResource(resource, score));
    }

    private void SetupNamespaceScore(string @namespace, double score)
    {
        _searchScoreCalculator
            .CalculateGroupScore(
                Arg.Is<IEnumerable<ScoreWithResource>>(
                    x => x.All(a => a.Resource.Namespace == @namespace)))
            .Returns(score);
    }
}