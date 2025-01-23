using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Deployments.Api.Core;

internal class PodsDefinition : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => "Pods";

    public string GetEndpointPath(string endpointName) => $"api/Pods/{endpointName}";
}
