using DeploymentCenter.Api.Framework;
using DeploymentCenter.Deployments.Core.Exceptions;
using DeploymentCenter.SharedKernel;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Deployments.Api.Core;

internal class ResultsHandler
{
    public static IResult HandleResult(Result result, Func<IResult> successResultFactory)
    {
        if (result.IsSuccess)
        {
            return successResultFactory();
        }

        if (result.Error?.Exception is BadRequestException exception)
        {
            return Results.BadRequest(new ApiErrorResult((int)exception.DeploymentsStatusCode));
        }

        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
}
