using DeploymentCenter.Deployments.Features.GetDeploymentMetrics;
using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Metrics.Features.GetDeploymentMetrics.Contract;
using DeploymentCenter.Metrics.Features.Shared;
using FluentAssertions;
using NSubstitute;

namespace DeploymentCenter.Metrics.Tests.Features;

internal class GetDeploymentMetricsHandlerTests
{
    private GetDeploymentMetricsHandler _sut;
    private IMetricsClient _metricsClient;

    [SetUp]
    public void Setup()
    {
        _metricsClient = Substitute.For<IMetricsClient>();
        _sut = new GetDeploymentMetricsHandler(_metricsClient);
    }

    [Test]
    public async Task Handle_WhenMetricsAreAvailable_ReturnsDeploymentMetrics()
    {
        // Arrange
        _metricsClient.AreMetricsAvailable().Returns(true);
        _metricsClient.GetDeploymentMetrics("namespace", "deploymentName").Returns(new CurrentUsage(0.004m, 6));
        var expectedResult = new CurrentUsage(4, 6);

        // Act
        var result = await _sut.Handle(new GetDeploymentMetricsQuery("namespace", "deploymentName"), CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }

    [Test]
    public async Task Handle_WhenMetricsAreAvailableAndNoContainers_ReturnsDeploymentMetricsWithZeroValues()
    {
        // Arrange
        _metricsClient.AreMetricsAvailable().Returns(true);
        _metricsClient.GetDeploymentMetrics("namespace", "deploymentName").Returns(new CurrentUsage(0, 0));
        var expectedResult = new CurrentUsage(0, 0);

        // Act
        var result = await _sut.Handle(new GetDeploymentMetricsQuery("namespace", "deploymentName"), CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }
}
