using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Api.Framework.Endpoints;

public abstract class ApiEndpointBase(IEndpointInfoFactory endpointInfoFactory) : IApiEndpoint
{
    protected virtual string EndpointName => GetType().Name.Replace("Endpoint", "");

    protected string EndpointPath => endpointInfoFactory.GetEndpointPath(EndpointName);

    protected string Tag => endpointInfoFactory.GetEndpointGroupTag();

    protected abstract Delegate Handler { get; }

    public abstract void Map(IEndpointRouteBuilder app);
}
