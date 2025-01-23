using DeploymentCenter.CronJobs.Features.CreateCronJob.Contract;
using DeploymentCenter.Services.Features;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.CronJobs.Features.CreateCronJob;

internal class CreateCronJobHandler(IServiceClient serviceClient) : IRequestHandler<CreateCronJobCommand, Result>
{
    public async Task<Result> Handle(CreateCronJobCommand request, CancellationToken cancellationToken)
    {
        await serviceClient.CreateCronJob(new(
            request.Namespace,
            request.Name,
            request.CronExpression,
            request.Containers));

        return Result.OnSuccess();
    }
}
