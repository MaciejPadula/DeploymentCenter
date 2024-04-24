using DeploymentCenter.Deployments.Contract.Models;

namespace DeploymentCenter.Deployments.Api.Features.GetDeploymentsList;

internal static class DeploymentExtensions
{
    public static List<Deployment> ToDtosList(this IEnumerable<DeploymentBasicInfo> deployments) =>
        deployments.ToDtos().ToList();

    public static IEnumerable<Deployment> ToDtos(this IEnumerable<DeploymentBasicInfo> deployments) =>
        deployments.Select(deployment => deployment.ToDto());

    public static Deployment ToDto(this DeploymentBasicInfo deployment) => new Deployment(deployment.Name);
}
