using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Services.Features.RunCronJob.Contract;

public record RunCronJobCommand(
    string Namespace,
    string CronJobName) : IRequest<Result>;
