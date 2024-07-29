using DeploymentCenter.Services.Api.Features.CreateLoadBalancer;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Services.Api;

public static class ServicesEndpoints
{
    public static void MapServicesEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapCreateLoadBalancerEndpoint();
    }
}
