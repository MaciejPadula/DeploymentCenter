using DeploymentCenter.Deployments.Api.Core.Models;
using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.Deployments.IntegrationTests.Extensions;
using DeploymentCenter.IntegrationTests.Lib;
using FluentAssertions;
using System.Net;

namespace DeploymentCenter.Deployments.IntegrationTests;

internal class CreateDeploymentTests
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
    public async Task CreateDeployment_WhenDeploymentIsPassed_ShouldAddItToKubernetes()
    {
        // Arrange
        var request = new CreateDeploymentEndpoint.CreateDeploymentRequest(
            "default",
            "test-deployment",
            "test-application",
            3,
            [new Container(
                "test-container",
                "test-image",
                [new(80, 8080)],
                [new( "test-key", "test-value", null)])
            ]);

        var expectedDetails = new GetDeploymentDetailsEndpoint.GetDeploymentDetailsResponse(
            "default",
            "test-deployment",
            "test-application",
            0,
            3);

        var expectedContainers = new GetDeploymentContainersEndpoint.GetDeploymentContainersResponse(
        [
            new Container(
                "test-container",
                "test-image",
                [new(80, 8080)],
                [new("test-key", "test-value", null)])
        ]);

        // Act
        var postResult = await _sut.CreateDeployment(request);
        var basicInfo = await _sut.GetDeploymentDetails("default", "test-deployment");
        var containers = await _sut.GetDeploymentContainersResponse("default", "test-deployment");

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.OK);

        basicInfo.Should().BeEquivalentTo(expectedDetails);
        containers.Should().BeEquivalentTo(expectedContainers);
    }

    [Test]
    public async Task CreateDeployment_WhenReplicasCountIsInvalid_ShouldReturnBadRequest()
    {
        // Arrange
        var request = new CreateDeploymentEndpoint.CreateDeploymentRequest(
            "default",
            "test-deployment",
            "test-application",
            0,
            [new Container(
                "test-container",
                "test-image",
                [new(80, 8080)],
                [new( "test-key", "test-value", "test-config-map")])
            ]);

        // Act
        var result = await _sut.CreateDeployment(request);

        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}