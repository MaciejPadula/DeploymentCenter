using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.IntegrationTests.Lib;
using DeploymentCenter.Templates.Api.Features;
using FluentAssertions;
using System.Net;
using static DeploymentCenter.Services.Api.Features.GetLoadBalancerDetailsEndpoint;

namespace DeploymentCenter.Templates.IntegrationTests;

public class ApplyTemplateTests
{
    private SystemUnderTest _sut;

    [SetUp]
    public async Task SetUp()
    {
        _sut = await SystemUnderTestFactory.CreateAsync();
    }

    [Test]
    // TODO: VOLUMETODO
    public async Task ApplySqlServer_ShouldCreateDeploymentWithLoadBalancerAnd()
    {
        // Arrange
        var request = new ApplyTemplateEndpoint.ApplyTemplateRequest(
            "sql-server",
            new Dictionary<string, string>
            {
                { "appName", "sql-server" },
                { "port", "1433" },
                { "ipAddress", "192.168.1.1"},
                { "namespace", "default" },
                { "saPassword", "zaq1@WSX" }
            });

        var expectedDeployment = new GetDeploymentDetailsEndpoint.GetDeploymentDetailsResponse(
            "default",
            "sql-server-deploy",
            "sql-server",
            1);
        var expectedLoadBalancer = new GetLoadBalancerDetailsResponse(
            "default",
            "sql-server-lb",
            "sql-server");

        // Act
        var result = await _sut.PostAsync("/api/Templates/ApplyTemplate", request);
        var deployment = await _sut.GetAsync<GetDeploymentDetailsEndpoint.GetDeploymentDetailsResponse>("/api/Deployments/GetDeploymentDetails?namespace=default&deploymentName=sql-server-deploy");
        var loadBalancer = await _sut.GetAsync<GetLoadBalancerDetailsResponse>("/api/Services/GetLoadBalancerDetails?namespace=default&loadBalancerName=sql-server-lb");


        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.Created);
        deployment.Should().BeEquivalentTo(expectedDeployment);
        loadBalancer.Should().BeEquivalentTo(expectedLoadBalancer);
    }
}