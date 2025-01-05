using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.Deployments.IntegrationTests.Extensions;
using DeploymentCenter.IntegrationTests.Lib;
using FluentAssertions;

namespace DeploymentCenter.Deployments.IntegrationTests;

internal class GetDeploymentPodsEndpointTests
{
    private SystemUnderTest _sut;

    [SetUp]
    public async Task Setup()
    {
        _sut = await SystemUnderTestFactory.CreateAsync();
    }

    [TearDown]
    public async Task TearDown()
    {
        await _sut.TearDown();
    }

    [Test]
    public async Task GetDeploymentPods_WhenDeploymentIsCreated_ShouldReturnPods()
    {
        // Arrange
        var deployment = new CreateDeploymentEndpoint.CreateDeploymentRequest(
            "default",
            "test-deployment",
            "test-application",
            3,
            [new DeploymentCenter.Api.Models.Container(
                "test-container",
                "test-image",
                [new(80, 8080)],
                [],
                [new("test-key", "test-value", null)])]);

        await _sut.CreateDeployment(deployment);

        // Act
        var response = await _sut.GetDeploymentPods("default", "test-deployment");

        // Assert
        response.Should().NotBeNull();
        response?.Pods.Should().NotBeEmpty();
        response?.Pods.Count.Should().Be(3);

    }
}
