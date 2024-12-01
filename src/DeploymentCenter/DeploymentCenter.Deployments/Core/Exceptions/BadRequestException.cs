namespace DeploymentCenter.Deployments.Core.Exceptions;

public enum DeploymentsStatusCode
{
    Unknown = 0,
    Duplicate = 1,
    InvalidReplicas = 2,
}

public class BadRequestException(DeploymentsStatusCode deploymentsStatusCode) : Exception()
{
    public DeploymentsStatusCode DeploymentsStatusCode { get; private set; } = deploymentsStatusCode;
}
