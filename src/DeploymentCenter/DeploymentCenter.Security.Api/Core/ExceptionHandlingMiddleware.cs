using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Security.Api.Core;

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
            (int StatusCode, string Message) = ex switch
            {
                UnauthorizedAccessException _ => (StatusCodes.Status401Unauthorized, ex.Message),
                _ => (StatusCodes.Status500InternalServerError, string.Empty)
            };

            if (string.IsNullOrEmpty(Message))
            {
                throw;
            }

            context.Response.StatusCode = StatusCode;
            await context.Response.WriteAsJsonAsync(Message);
        }
    }
}
