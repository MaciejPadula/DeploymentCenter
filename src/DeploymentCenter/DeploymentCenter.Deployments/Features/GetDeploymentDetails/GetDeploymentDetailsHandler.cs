using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentDetails;

internal class GetDeploymentDetailsHandler(IDeploymentClient deploymentClient) : IRequestHandler<GetDeploymentDetailsQuery, DeploymentDetails?>
{
    public async Task<DeploymentDetails?> Handle(GetDeploymentDetailsQuery request, CancellationToken cancellationToken)
    {
        return await deploymentClient.GetDetails(
            request.Namespace,
            request.DeploymentName);
    }
}
