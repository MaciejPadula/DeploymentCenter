using DeploymentCenter.SharedKernel;
using DeploymentCenter.SharedKernel.Models;
using MediatR;

namespace DeploymentCenter.CronJobs.Features.CreateCronJob.Contract;

public record CreateCronJobCommand(
    string Namespace,
    string Name,
    string CronExpression,
    List<Container> Containers) : IRequest<Result>;
