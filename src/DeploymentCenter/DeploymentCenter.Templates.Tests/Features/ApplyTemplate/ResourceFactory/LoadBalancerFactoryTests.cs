using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.CreateLoadBalancer.Contract;
using DeploymentCenter.Templates.Core.Models;
using DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;
using FluentAssertions;

namespace DeploymentCenter.Templates.Tests.Features.ApplyTemplate.ResourceFactory;

internal class LoadBalancerFactoryTests
{
    private LoadBalancerFactory _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new LoadBalancerFactory();
    }

    [Test]
    public void CanCreate_WhenResourceTypeIsLoadBalancer_ShouldReturnTrue()
    {
        // Arrange
        var resourceType = ResourceType.LoadBalancer;

        // Act
        var result = _sut.CanCreate(resourceType);

        // Assert
        result.Should().BeTrue();
    }

    [Test]
    [TestCase(ResourceType.Deployment)]
    [TestCase(ResourceType.Volume)]
    public void CanCreate_WhenResourceTypeIsNotLoadBalancer_ShouldReturnFalse(ResourceType resourceType)
    {
        // Arrange
        // Act
        var result = _sut.CanCreate(resourceType);

        // Assert
        result.Should().BeFalse();
    }

    [Test]
    public void Create_WhenAllVariablesAreProvided_ShouldReturnMediatorRequest()
    {
        // Arrange
        var compiledVariables = new Dictionary<string, string>
        {
            { "Namespace", "test-namespace" },
            { "Name", "test-load-balancer" },
            { "ApplicationName", "test-app" },
            { "Ports", "80:80,443:443" },
            { "IpAddresses", "172.30.0.1"}
        };

        var expectedLoadBalancer = new CreateLoadBalancerCommand(
            "test-namespace",
            "test-load-balancer",
            "test-app",
            [
                new LoadBalancerPort(80, 80),
                new LoadBalancerPort(443, 443)
            ],
            ["172.30.0.1"]);

        // Act
        var result = _sut.Create(compiledVariables);

        // Assert
        result.Should().BeEquivalentTo(expectedLoadBalancer);
    }

    [Test]
    public void Create_WhenCollectionsAreEmpty_ShouldReturnMediatorRequest()
    {
        // Arrange
        var compiledVariables = new Dictionary<string, string>
        {
            { "Namespace", "test-namespace" },
            { "Name", "test-load-balancer" },
            { "ApplicationName", "test-app" },
            { "Ports", "" },
            { "IpAddresses", ""}
        };

        var expectedLoadBalancer = new CreateLoadBalancerCommand(
            "test-namespace",
            "test-load-balancer",
            "test-app",
            [],
            []);

        // Act
        var result = _sut.Create(compiledVariables);

        // Assert
        result.Should().BeEquivalentTo(expectedLoadBalancer);
    }
}
