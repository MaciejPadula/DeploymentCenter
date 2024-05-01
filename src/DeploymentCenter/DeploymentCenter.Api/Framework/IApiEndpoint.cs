using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Api.Framework;

public interface IApiEndpoint
{
    public void Map(IEndpointRouteBuilder app);
}
