using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Api.Framework.Endpoints;

public abstract class ApiEndpointBase(IEndpointInfoFactory endpointInfoFactory) : IApiEndpoint
{
    protected abstract string EndpointName { get; }

    protected string EndpointPath => endpointInfoFactory.GetEndpointPath(EndpointName);

    protected string Tag => endpointInfoFactory.GetEndpointGroupTag();

    protected abstract Delegate Handler { get; }

    public abstract void Map(IEndpointRouteBuilder app);
}
