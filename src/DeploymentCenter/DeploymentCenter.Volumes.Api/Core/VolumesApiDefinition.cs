using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Volumes.Api.Core;

internal class VolumesApiDefinition : IEndpointInfoFactory
{
    public string GetEndpointGroupTag() => VolumesConsts.EndpointGroupTag;

    public string GetEndpointPath(string endpointName) => $"api/Volumes/{endpointName}";
}
