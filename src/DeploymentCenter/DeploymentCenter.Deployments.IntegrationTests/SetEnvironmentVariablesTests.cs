using DeploymentCenter.Deployments.Api.Core.Models;
using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.Deployments.IntegrationTests.Extensions;
using DeploymentCenter.IntegrationTests.Lib;
using FluentAssertions;
using System.Net;
using static DeploymentCenter.Deployments.Api.Features.GetDeploymentContainersEndpoint;

namespace DeploymentCenter.Deployments.IntegrationTests;

internal class SetEnvironmentVariablesTests
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
    public async Task SetEnvironmentVariables_WhenVariablesProvided_ShouldSetThem()
    {
        // Arrange
        var deployment = new CreateDeploymentEndpoint.CreateDeploymentRequest(
            "default",
            "test-deployment",
            "test-application",
            3,
            [new Container(
                "test-container",
                "test-image",
                [new(80, 8080)],
                [new("test-key", "test-value", null)])]);

        await _sut.CreateDeployment(deployment);

        var expectedEnvVariables = new List<ContainerEnvironment>
        {
            new("test-key", "test-value", null),
            new("test-key2", "test-value2", null)
        };

        // Act
        var scaleRequest = new SetEnvironmentVariablesEndpoint.SetEnvironmentVariablesRequest(
            "default",
            "test-deployment",
            "test-container",
            [new("test-key", "test-value", null), new("test-key2", "test-value2", null)]);
        var result = await _sut.PostAsync("/api/Deployments/SetEnvironmentVariables", scaleRequest);
        var containersResult = await _sut.GetAsync<GetDeploymentContainersResponse>("/api/Deployments/GetDeploymentContainers?namespace=default&deploymentName=test-deployment");
        var containers = containersResult?.Containers;

        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.OK);
        containers.Should().NotBeNull();
        containers?.FirstOrDefault(x => x.Name == "test-container")?.EnvironmentVariables.Should().BeEquivalentTo(expectedEnvVariables);
    }
}
