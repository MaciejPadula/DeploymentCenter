using DeploymentCenter.Deployments.Features.GetDeploymentMetrics;
using DeploymentCenter.Deployments.Features.GetDeploymentMetrics.Contract;
using DeploymentCenter.Deployments.Shared;
using DeploymentCenter.Deployments.Shared.Models;
using FluentAssertions;
using NSubstitute;

namespace DeploymentCenter.Deployments.Tests.Features;

internal class GetDeploymentMetricsHandlerTests
{
    private GetDeploymentMetricsHandler _sut;
    private IDeploymentClient _deploymentClient;
    private TimeProvider _timeProvider;

    [SetUp]
    public void Setup()
    {
        _deploymentClient = Substitute.For<IDeploymentClient>();
        _timeProvider = Substitute.For<TimeProvider>();
        _sut = new GetDeploymentMetricsHandler(_deploymentClient, _timeProvider);
    }

    [Test]
    public async Task Handle_WhenMetricsAreNotAvailable_ReturnsNull()
    {
        // Arrange
        _deploymentClient.AreMetricsAvailable().Returns(false);

        // Act
        var result = await _sut.Handle(new GetDeploymentMetricsQuery("namespace", "deploymentName"), CancellationToken.None);

        // Assert
        result.Should().BeNull();
    }

    [Test]
    public async Task Handle_WhenMetricsAreAvailable_ReturnsDeploymentMetrics()
    {
        // Arrange
        var timestamp = new DateTime(2021, 10, 10, 12, 0, 0, kind: DateTimeKind.Utc);
        _deploymentClient.AreMetricsAvailable().Returns(true);
        _deploymentClient.GetDeploymentStatistics("namespace", "deploymentName").Returns(
        [
            new ContainerMetrics("container1", timestamp, 1, 2),
            new ContainerMetrics("container2", timestamp, 3, 4)
        ]);
        _timeProvider.GetUtcNow().Returns(new DateTimeOffset(timestamp));
        var expectedResult = new DeploymentMetrics(timestamp, 4, 6);

        // Act
        var result = await _sut.Handle(new GetDeploymentMetricsQuery("namespace", "deploymentName"), CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }

    [Test]
    public async Task Handle_WhenMetricsAreAvailableAndNoContainers_ReturnsDeploymentMetricsWithZeroValues()
    {
        // Arrange
        var timestamp = new DateTime(2021, 10, 10, 12, 0, 0, kind: DateTimeKind.Utc);
        _deploymentClient.AreMetricsAvailable().Returns(true);
        _deploymentClient.GetDeploymentStatistics("namespace", "deploymentName").Returns(new List<ContainerMetrics>());
        _timeProvider.GetUtcNow().Returns(new DateTimeOffset(timestamp));
        var expectedResult = new DeploymentMetrics(timestamp, 0, 0);

        // Act
        var result = await _sut.Handle(new GetDeploymentMetricsQuery("namespace", "deploymentName"), CancellationToken.None);

        // Assert
        result.Should().BeEquivalentTo(expectedResult);
    }
}
