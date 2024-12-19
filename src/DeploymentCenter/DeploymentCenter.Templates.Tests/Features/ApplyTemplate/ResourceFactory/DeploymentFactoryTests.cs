using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;
using FluentAssertions;

namespace DeploymentCenter.Templates.Tests.Features.ApplyTemplate.ResourceFactory;

internal class DeploymentFactoryTests
{
    private DeploymentFactory _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new DeploymentFactory();
    }

    [Test]
    public void CanCreate_WhenDeploymentTypeProvided_ShouldReturnTrue()
    {
        // Arrange
        // Act
        var result = _sut.CanCreate(ResourceType.Deployment);

        // Assert
        result.Should().BeTrue();
    }

    [Test]
    [TestCase(ResourceType.LoadBalancer)]
    [TestCase(ResourceType.Volume)]
    public void CanCreate_WhenOtherTypeProvided_ShouldReturnFalse(ResourceType type)
    {
        // Arrange
        // Act
        var result = _sut.CanCreate(type);

        // Assert
        result.Should().BeFalse();
    }

    [Test]
    public void Create_WhenAllVariablesAreProvided_ShouldReturnMediatorRequest()
    {
        // Arrange
        var setVariable = new Dictionary<string, string>
        {
            { "Namespace", "test-namespace" },
            { "ApplicationName", "test-app" },
            { "ContainerName", "sql-server" },
            { "Image", "test-image" },
            { "Name", "test-app-deploy" },
            { "Replicas", "1" },
            { "Port", "1433" },
            { "HostPort", "8080" },
            { "EnvVariables", "MSSQL_SA_PASSWORD:test-password,ACCEPT_EULA:Y" }
        };

        var expectedDeployment = new CreateDeploymentCommand(
            "test-namespace",
            "test-app-deploy",
            "test-app",
            1,
            [
                new("sql-server", "test-image", [new(1433, 8080)], [], [new("MSSQL_SA_PASSWORD", "test-password", null), new("ACCEPT_EULA", "Y", null)])
            ]);

        // Act
        var result = _sut.Create(setVariable);

        // Assert
        result.Should().BeEquivalentTo(expectedDeployment);
    }

    [Test]
    public void Create_WhenEnvVariablesAreEmpty_ShouldReturnMediatorRequest()
    {
        // Arrange
        var setVariable = new Dictionary<string, string>
        {
            { "Namespace", "test-namespace" },
            { "ApplicationName", "test-app" },
            { "ContainerName", "sql-server" },
            { "Image", "test-image" },
            { "Name", "test-app-deploy" },
            { "Replicas", "1" },
            { "Port", "1433" },
            { "HostPort", "8080" },
            { "EnvVariables", "" }
        };

        var expectedDeployment = new CreateDeploymentCommand(
            "test-namespace",
            "test-app-deploy",
            "test-app",
            1,
            [
                new("sql-server", "test-image", [new(1433, 8080)], [], [])
            ]);

        // Act
        var result = _sut.Create(setVariable);

        // Assert
        result.Should().BeEquivalentTo(expectedDeployment);
    }
}
