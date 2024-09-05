using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Services.Api.Shared;

internal class ServicesEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => ServicesConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Services/{endpointName}";
}
