using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Namespaces.Api.Core;

internal class NamespaceEndpointInfoFactory : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => NamespacesConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Namespaces/{endpointName}";
}
