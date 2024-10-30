using DeploymentCenter.Infrastructure.K8s;
using DeploymentCenter.Services.Contract.Models;
using FluentAssertions;
using k8s.Models;

namespace DeploymentCenter.Infrastructure.Tests.K8s;
internal class K8sServiceMapperTests
{
    private K8sServiceMapper _sut;

    [SetUp]
    public void Setup()
    {
        _sut = new K8sServiceMapper();
    }

    [Test]
    public void MapService_WhenCalled_ReturnsService()
    {
        // Arrange
        var service = new V1Service
        {
            Metadata = new V1ObjectMeta
            {
                Name = "service-name",
                NamespaceProperty = "namespace",
            }
        };
        var expectedService = new LoadBalancerBasicInfo("namespace", "service-name");

        // Act
        var result = _sut.Map(service);

        // Assert
        result.Should().BeEquivalentTo(expectedService);
    }

    [Test]
    public void MapServiceDetails_WhenCalled_ReturnsServiceDetails()
    {
        // Arrange
        var service = new V1Service
        {
            Metadata = new V1ObjectMeta
            {
                Name = "service-name",
                NamespaceProperty = "namespace",
            },
            Spec = new V1ServiceSpec
            {
                Selector = new Dictionary<string, string>
                {
                    { "app", "app-name" }
                }
            }
        };
        var expectedDetails = new LoadBalancerDetails("namespace", "service-name", "app-name");

        // Act
        var result = _sut.MapDetails(service);

        // Assert
        result.Should().BeEquivalentTo(expectedDetails);
    }

    [Test]
    public void MapLoadBalancer_WhenCalled_ReturnsLoadBalancer()
    {
        // Arrange
        var loadBalancer = new LoadBalancer(
            "namespace",
            "service-name",
            "app-name",
            [
                new LoadBalancerPort
                {
                    Port = 80,
                    TargetPort = 8080
                }
            ],
            [
                "127.0.0.1"
            ]);
        var expectedService = new V1Service
        {
            Metadata = new V1ObjectMeta
            {
                Name = "service-name",
                NamespaceProperty = "namespace",
            },
            Spec = new V1ServiceSpec
            {
                Type = "LoadBalancer",
                Selector = new Dictionary<string, string>
                {
                    { "app", "app-name" }
                },
                Ports =
                [
                    new()
                    {
                        Port = 80,
                        TargetPort = 8080
                    }
                ],
                ExternalIPs = new List<string>
                {
                    "127.0.0.1"
                }
            }
        };

        // Act
        var result = _sut.Map(loadBalancer);

        // Assert
        result.Should().BeEquivalentTo(expectedService);
    }
}
