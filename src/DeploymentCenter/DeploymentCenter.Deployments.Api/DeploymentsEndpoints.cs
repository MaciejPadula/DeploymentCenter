using DeploymentCenter.Deployments.Api.Features.CreateDeployment;
using DeploymentCenter.Deployments.Api.Features.GetDeploymentContainers;
using DeploymentCenter.Deployments.Api.Features.GetDeploymentDetails;
using DeploymentCenter.Deployments.Api.Features.GetDeploymentPods;
using DeploymentCenter.Deployments.Api.Features.GetDeploymentsList;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Deployments.Api;

public static class DeploymentsEndpoints
{
    public static void MapDeploymentsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapCreateDeploymentEndpoint();
        endpoints.MapGetDeploymentDetailsEndpoint();
        endpoints.MapGetDeploymentsListEndpoint();
        endpoints.MapGetDeploymentContainersEndpoint();
        endpoints.MapGetDeploymentPodsEndpoint();
    }
}
