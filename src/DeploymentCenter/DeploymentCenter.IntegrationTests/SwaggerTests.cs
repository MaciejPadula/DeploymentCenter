using DeploymentCenter.IntegrationTests.Lib;
using FluentAssertions;

namespace DeploymentCenter.IntegrationTests;

internal class SwaggerTests
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
    public async Task WhenAppIsStarted_ShouldReturnSwaggerUI()
    {
        // Arrange
        var expectedTitle = "<title>Swagger UI</title>";

        // Act
        var result = await _sut.GetAsync("/swagger", true);
        var content = await result.Content.ReadAsStringAsync();

        // Assert
        result.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
        content.Should().Contain(expectedTitle);
    }
}
