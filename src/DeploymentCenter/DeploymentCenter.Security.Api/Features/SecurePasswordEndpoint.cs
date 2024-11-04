using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Security.Api.Core;
using DeploymentCenter.Security.Features.SecurePassword.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Security.Api.Features;

internal class SecurePasswordEndpoint() : ApiPostEndpointBase(new SecurityEndpointInfoFactory())
{
    private record SecurePasswordRequest(string PlainText);

    private record SecurePasswordResponse(string SecurePassword);

    protected override Delegate Handler => async (
        IMediator mediator,
        SecurePasswordRequest request,
        CancellationToken cancellationToken) =>
    {
        var password = await mediator.Send(new SecurePasswordQuery(request.PlainText), cancellationToken);

        return Results.Ok(new SecurePasswordResponse(password));
    };
}
