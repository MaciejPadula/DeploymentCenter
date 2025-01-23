using DeploymentCenter.Services.Core.Models;
using DeploymentCenter.Services.Features.GetCronJobDetails.Contract;
using MediatR;

namespace DeploymentCenter.Services.Features.GetCronJobDetails;

internal class GetCronJobDetailsHandler(IServiceClient serviceClient) : IRequestHandler<GetCronJobDetailsQuery, CronJobDetails?>
{
    public async Task<CronJobDetails?> Handle(GetCronJobDetailsQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetCronJobDetails(
            request.Namespace,
            request.CronJobName);
    }
}
