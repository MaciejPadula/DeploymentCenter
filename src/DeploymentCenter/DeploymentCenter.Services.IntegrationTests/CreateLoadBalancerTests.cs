using DeploymentCenter.Api.Framework;
using DeploymentCenter.IntegrationTests.Lib;
using DeploymentCenter.Services.Api.Features;
using DeploymentCenter.Services.Core.Exceptions;
using FluentAssertions;
using System.ComponentModel;
using System.Net;
using System.Net.Http.Json;
using static DeploymentCenter.Services.Api.Features.GetLoadBalancerDetailsEndpoint;

namespace DeploymentCenter.Services.IntegrationTests;

internal class CreateLoadBalancerTests
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
    public async Task CreateLoadBalancer_WhenLoadBalancerIsPassed_ShouldAddItToKubernetes()
    {
        // Arrange
        var request = new CreateLoadBalancerEndpoint.CreateLoadBalancerRequest(
            "default",
            "test-service",
            "test-application",
            [new(80, 80)],
            []);

        var expectedResult = new GetLoadBalancerDetailsResponse(
            "default",
            "test-service",
            "test-application");

        // Act
        var postResult = await _sut.PostAsync("/api/Services/CreateLoadBalancer", request);
        var basicInfo = await _sut.GetAsync<GetLoadBalancerDetailsResponse>("/api/Services/GetLoadBalancerDetails?namespace=default&loadBalancerName=test-service");

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.Created);
        basicInfo.Should().BeEquivalentTo(expectedResult);
    }

    [Test]
    public async Task CreateLoadBalancer_WhenPortsAreMissing_ShouldReturnBadRequest()
    {
        // Arrange
        var request = new CreateLoadBalancerEndpoint.CreateLoadBalancerRequest(
            "default",
            "test-service",
            "test-application",
            [],
            []);
        await _sut.PostAsync("/api/Services/CreateLoadBalancer", request);

        // Act
        var result = await _sut.PostAsync("/api/Services/CreateLoadBalancer", request);
        var content = await result.Content.ReadFromJsonAsync<ApiErrorResult>();

        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        content?.Code.Should().Be((int)ServicesStatusCode.PortsRequired);
    }

    [Test]
    public async Task CreateLoadBalancer_WhenLoadBalancerExists_ShouldReturnBadRequest()
    {
        // Arrange
        var request = new CreateLoadBalancerEndpoint.CreateLoadBalancerRequest(
            "default",
            "test-service",
            "test-application",
            [new(80, 80)],
            []);
        await _sut.PostAsync("/api/Services/CreateLoadBalancer", request);

        // Act
        var result = await _sut.PostAsync("/api/Services/CreateLoadBalancer", request);
        var content = await result.Content.ReadFromJsonAsync<ApiErrorResult>();

        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        content?.Code.Should().Be((int)ServicesStatusCode.Duplicate);
    }
}
