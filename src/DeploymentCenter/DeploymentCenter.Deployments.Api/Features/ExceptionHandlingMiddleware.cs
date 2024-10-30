using DeploymentCenter.Deployments.Contract.Exceptions;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Deployments.Api.Features;

internal class ExceptionHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            (int StatusCode, string Message) message = ex switch
            {
                ReplicasInvalidException _ => (StatusCodes.Status400BadRequest, ex.Message),
                _ => (StatusCodes.Status500InternalServerError, string.Empty)
            };

            context.Response.StatusCode = message.StatusCode;
            await context.Response.WriteAsJsonAsync(message.Message);
        }
    }
}
