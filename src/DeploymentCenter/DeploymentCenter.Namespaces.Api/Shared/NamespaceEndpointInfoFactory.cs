using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Namespaces.Api.Shared;

internal class NamespaceEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => NamespacesConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Namespaces/{endpointName}";
}
