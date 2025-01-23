using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.GetCronJobDetails.Contract;

public record GetCronJobDetailsQuery(
    string Namespace,
    string CronJobName) : IRequest<CronJobDetails?>;
