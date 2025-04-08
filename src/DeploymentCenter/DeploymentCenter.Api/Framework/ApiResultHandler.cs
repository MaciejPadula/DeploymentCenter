using DeploymentCenter.SharedKernel;
using DeploymentCenter.SharedKernel.Exceptions;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Api.Framework;

public class ApiResultHandler
{
    public static IResult HandleResult(Result result, Func<IResult> successResultFactory)
    {
        if (result.IsSuccess)
        {
            return successResultFactory();
        }

        if (result.Error?.Exception is BadRequestException exception)
        {
            return Results.BadRequest(new ApiErrorResult((int)exception.ApplicationErrorStatusCode));
        }

        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
}
