using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Metrics.Api.Core;

internal class MetricsEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => MetricsConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/{MetricsConsts.EndpointGroupTag}/{endpointName}";
}
