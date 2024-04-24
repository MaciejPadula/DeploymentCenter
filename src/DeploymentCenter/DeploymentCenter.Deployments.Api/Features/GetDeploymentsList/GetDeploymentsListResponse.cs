using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentsList;

internal record GetDeploymentsListResponse(List<Deployment> Deployments) : IApiResponse;