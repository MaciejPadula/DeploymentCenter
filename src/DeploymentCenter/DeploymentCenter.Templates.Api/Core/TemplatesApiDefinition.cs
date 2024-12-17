using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Templates.Api.Core;

internal class TemplatesApiDefinition : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => "Templates";

    public string GetEndpointPath(string endpointName) => $"api/Templates/{endpointName}";
}
