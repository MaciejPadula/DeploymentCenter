using DeploymentCenter.Services.Core.Exceptions;
using DeploymentCenter.Services.Features.RunCronJob.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Services.Features.RunCronJob;

internal class RunCronJobHandler(IServiceClient serviceClient) : IRequestHandler<RunCronJobCommand, Result>
{
    public async Task<Result> Handle(RunCronJobCommand request, CancellationToken cancellationToken)
    {
        var isRunning = await serviceClient.RunCronJob(request.Namespace, request.CronJobName);

        return isRunning
            ? Result.OnSuccess()
            : Result.OnError(new NotFoundException());
    }
}
