using DeploymentCenter.Deployments.Api.Features;
using DeploymentCenter.IntegrationTests.Lib;
using static DeploymentCenter.Deployments.Api.Features.GetDeploymentPodsEndpoint;

namespace DeploymentCenter.Deployments.IntegrationTests.Extensions;

internal static class SystemUnderTestsExtensions
{
    public static async Task<HttpResponseMessage> CreateDeployment(this SystemUnderTest sut, CreateDeploymentEndpoint.CreateDeploymentRequest deploymentRequest) =>
        await sut.PostAsync("/api/Deployments/CreateDeployment", deploymentRequest);

    public static async Task<GetDeploymentDetailsEndpoint.GetDeploymentDetailsResponse?> GetDeploymentDetails(this SystemUnderTest sut, string @namespace, string name) =>
        await sut.GetAsync<GetDeploymentDetailsEndpoint.GetDeploymentDetailsResponse>($"/api/Deployments/GetDeploymentDetails?namespace={@namespace}&deploymentName={name}");

    public static async Task<GetDeploymentContainersEndpoint.GetDeploymentContainersResponse?> GetDeploymentContainersResponse(this SystemUnderTest sut, string @namespace, string name) =>
        await sut.GetAsync<GetDeploymentContainersEndpoint.GetDeploymentContainersResponse>($"/api/Deployments/GetDeploymentContainers?namespace={@namespace}&deploymentName={name}");

    public static async Task<GetDeploymentPodsResponse?> GetDeploymentPods(this SystemUnderTest sut, string @namespace, string name) =>
        await sut.GetAsync<GetDeploymentPodsResponse>($"/api/Deployments/GetDeploymentPods?namespace={@namespace}&deploymentName={name}");
}
