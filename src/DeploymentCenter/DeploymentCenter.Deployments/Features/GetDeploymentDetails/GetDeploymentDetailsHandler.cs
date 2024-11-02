using DeploymentCenter.Deployments.Features.GetDeploymentDetails.Contract;
using DeploymentCenter.Deployments.Shared;
using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentDetails;

internal class GetDeploymentDetailsHandler : IRequestHandler<GetDeploymentDetailsQuery, DeploymentDetails?>
{
    private readonly IDeploymentClient _deploymentClient;

    public GetDeploymentDetailsHandler(IDeploymentClient deploymentClient)
    {
        _deploymentClient = deploymentClient;
    }

    public async Task<DeploymentDetails?> Handle(GetDeploymentDetailsQuery request, CancellationToken cancellationToken)
    {
        return await _deploymentClient.GetDetails(
            request.Namespace,
            request.DeploymentName);
    }
}
