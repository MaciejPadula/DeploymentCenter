using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.GetCronJobsList.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.GetCronJobsList;

internal class GetCronJobsListHandler(IServiceClient serviceClient) : IRequestHandler<GetCronJobsListQuery, List<CronJobBasicInfo>>
{
    public async Task<List<CronJobBasicInfo>> Handle(GetCronJobsListQuery request, CancellationToken cancellationToken)
    {
        var result = await serviceClient.GetCronJobsBasicInfos(request.Namespace);
        return result;
    }
}
