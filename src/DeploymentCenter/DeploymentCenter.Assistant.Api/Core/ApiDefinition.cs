using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Assistant.Api.Core;

internal class ApiDefinition : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => "Assistant";

    public string GetEndpointPath(string endpointName) => $"api/Assistant/{endpointName}";
}
