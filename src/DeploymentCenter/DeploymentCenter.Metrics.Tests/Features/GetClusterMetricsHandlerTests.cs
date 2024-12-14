using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Metrics.Features.GetClusterMetrics;
using DeploymentCenter.Metrics.Features.GetClusterMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using FluentAssertions;
using NSubstitute;

namespace DeploymentCenter.Metrics.Tests.Features;

public class GetClusterMetricsHandlerTests
{
    private GetClusterMetricsHandler _sut;
    private IMetricsClient _metricsClient;

    [SetUp]
    public void Setup()
    {
        _metricsClient = Substitute.For<IMetricsClient>();
        _sut = new GetClusterMetricsHandler(_metricsClient);
    }

    [Test]
    public async Task Handle_ReturnsCurrentMetrics()
    {
        // Arrange
        var currentUsages = new CurrentUsage(0.5m, 12m);
        var currentLimits = new CurrentLimit(1, 24);
        _metricsClient.AreMetricsAvailable().Returns(true);
        _metricsClient.GetClusterMetrics().Returns(currentUsages);
        _metricsClient.GetClusterLimits().Returns(currentLimits);
        var expectedResult = new CurrentMetrics(0.5m, 1, 12m, 24);

        // Act
        var result = await _sut.Handle(new GetClusterMetricsQuery(), CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }
}