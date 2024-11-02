using DeploymentCenter.Deployments.Core.Exceptions;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Deployments.Api.Core;

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

            if (string.IsNullOrEmpty(message.Message))
            {
                throw;
            }

            context.Response.StatusCode = message.StatusCode;
            await context.Response.WriteAsJsonAsync(message.Message);
        }
    }
}
