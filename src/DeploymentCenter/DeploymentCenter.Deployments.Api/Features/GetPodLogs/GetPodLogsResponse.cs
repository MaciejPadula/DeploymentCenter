using DeploymentCenter.Api;

namespace DeploymentCenter.Deployments.Api.Features.GetPodLogs;

internal record GetPodLogsResponse(
    string LogText) : IApiResponse;
