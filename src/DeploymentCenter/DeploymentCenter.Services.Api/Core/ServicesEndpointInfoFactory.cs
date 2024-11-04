using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Services.Api.Core;

internal class ServicesEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => ServicesConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Services/{endpointName}";
}
