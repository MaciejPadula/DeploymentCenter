using DeploymentCenter.SharedKernel.Models;

namespace DeploymentCenter.Services.Core.Models;

public record CronJob(
    string Namespace,
    string Name,
    string CronExpression,
    List<Container> Containers);