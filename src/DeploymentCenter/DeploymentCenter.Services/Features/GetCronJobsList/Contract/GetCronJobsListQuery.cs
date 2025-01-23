using DeploymentCenter.Services.Core.Models;
using MediatR;

namespace DeploymentCenter.Services.Features.GetCronJobsList.Contract;

public record GetCronJobsListQuery(string Namespace) : IRequest<List<CronJobBasicInfo>>;
