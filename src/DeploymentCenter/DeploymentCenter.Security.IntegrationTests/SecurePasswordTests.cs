using DeploymentCenter.IntegrationTests.Lib;
using DeploymentCenter.Security.Api.Features;
using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace DeploymentCenter.Security.IntegrationTests;

internal class SecurePasswordTests
{
    private SystemUnderTest _sut;

    [SetUp]
    public async Task SetUp()
    {
        _sut = await SystemUnderTestFactory.CreateAsync();
    }

    [TearDown]
    public async Task TearDown()
    {
        await _sut.TearDown();
    }

    [Test]
    public async Task SecurePassword_ShouldGenerateCorrectHashForAuthorization()
    {
        // Arrange
        var kubeconfig = _sut.KubeConfig;

        // Act
        var result = await _sut.PostAsync("/api/Security/SecurePassword", new SecurePasswordEndpoint.SecurePasswordRequest(kubeconfig));
        var response = await result.Content.ReadFromJsonAsync<SecurePasswordEndpoint.SecurePasswordResponse>();
        var authHeader = response?.SecurePassword;
        var testCallResult = await _sut.GetAsync("/api/Deployments/GetDeploymentsList?namespace=default", authHeader);

        // Assert
        testCallResult.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Test]
    public async Task SecurePassword_WhenPasswordIsIncorrect_ShouldThrowException()
    {
        // Arrange
        var kubeconfig = _sut.KubeConfig.Replace("\n", string.Empty);

        // Act
        var testCallResult = await _sut.GetAsync("/api/Deployments/GetDeploymentsList?namespace=default", kubeconfig);

        // Assert
        testCallResult.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}
