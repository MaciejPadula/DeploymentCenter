using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Security.Api.Shared;
using DeploymentCenter.Security.Contract.Features;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Security.Api.Features;

internal class SecurePasswordEndpoint() : ApiPostEndpointBase(new SecurityEndpointInfoFactory())
{
    private record SecurePasswordRequest(string PlainText);

    private record SecurePasswordResponse(string SecurePassword);

    protected override string EndpointName => "SecurePassword";

    protected override Delegate Handler => async (
        IMediator mediator,
        SecurePasswordRequest request,
        CancellationToken cancellationToken) =>
    {
        var password = await mediator.Send(new SecurePasswordQuery(request.PlainText), cancellationToken);

        return Results.Ok(new SecurePasswordResponse(password));
    };
}
