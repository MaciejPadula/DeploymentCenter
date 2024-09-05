namespace DeploymentCenter.Api.Framework;

public interface IEndpointInfoFactory
{
    string GetEndpointPath(string endpointName);
    string GetEndpointGroupTag();
}
