using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Security.Api.Shared;

internal class SecurityEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => SecurityConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Security/{endpointName}";
}
