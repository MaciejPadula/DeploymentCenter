namespace DeploymentCenter.Services.Core.Models;

public record CronJobBasicInfo(
    string Namespace,
    string Name,
    string CronExpression);
