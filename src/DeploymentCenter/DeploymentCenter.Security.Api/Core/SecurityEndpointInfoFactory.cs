using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Security.Api.Core;

internal class SecurityEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => SecurityConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Security/{endpointName}";
}
