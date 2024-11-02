using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Deployments.Api.Core;

internal class DeploymentsEndpointsInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => DeploymentsConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Deployments/{endpointName}";
}
