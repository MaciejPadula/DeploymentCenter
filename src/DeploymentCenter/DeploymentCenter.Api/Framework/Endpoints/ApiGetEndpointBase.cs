using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeploymentCenter.Api.Framework.Endpoints;

public abstract class ApiGetEndpointBase(IEndpointInfoFactory endpointInfoFactory) : ApiEndpointBase(endpointInfoFactory)
{
    public override void Map(IEndpointRouteBuilder app) => app
        .MapGet(EndpointPath, Handler)
        .WithTags(Tag);
}
