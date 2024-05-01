using DeploymentCenter.Deployments.Contract.Features;
using DeploymentCenter.Deployments.Contract.Models;
using DeploymentCenter.Deployments.Infrastructure;
using MediatR;

namespace DeploymentCenter.Deployments.Features;

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
