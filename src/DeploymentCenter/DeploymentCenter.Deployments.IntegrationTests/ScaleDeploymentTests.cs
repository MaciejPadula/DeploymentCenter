using DeploymentCenter.Api.Framework;
using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.Deployments.IntegrationTests.Extensions;
using DeploymentCenter.IntegrationTests.Lib;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace DeploymentCenter.Deployments.IntegrationTests;

internal class ScaleDeploymentTests
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
    public async Task ScaleDeployment_WhenReplicasCountIsChanged_ShouldReturnNewValue()
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
        var details = await _sut.GetDeploymentDetails("default", "test-deployment");

        // Act
        var scaleRequest = new ScaleDeploymentEndpoint.ScaleDeploymentRequest(
            "default",
            "test-deployment",
            5);
        var scaleResult = await _sut.PostAsync("/api/Deployments/ScaleDeployment", scaleRequest);
        var detailsAfterScale = await _sut.GetDeploymentDetails("default", "test-deployment");

        // Assert
        scaleResult.StatusCode.Should().Be(HttpStatusCode.OK);
        details?.AllReplicas.Should().Be(3);
        detailsAfterScale?.AllReplicas.Should().Be(5);
    }

    [Test]
    public async Task ScaleDeployment_WhenReplicasCountIsInvalid_ShouldReturnBadRequest()
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
        var scaleRequest = new ScaleDeploymentEndpoint.ScaleDeploymentRequest(
            "default",
            "test-deployment",
            -1);
        var scaleResult = await _sut.PostAsync("/api/Deployments/ScaleDeployment", scaleRequest);
        var content = await scaleResult.Content.ReadFromJsonAsync<ApiErrorResult>();

        // Assert
        scaleResult.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        content?.Code.Should().Be((int)DeploymentsStatusCode.InvalidReplicas);
    }
}
