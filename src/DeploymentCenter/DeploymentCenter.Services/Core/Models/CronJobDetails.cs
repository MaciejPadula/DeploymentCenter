namespace DeploymentCenter.Services.Core.Models;

public record CronJobDetails(
    string Namespace,
    string Name,
    string CronExpression);
