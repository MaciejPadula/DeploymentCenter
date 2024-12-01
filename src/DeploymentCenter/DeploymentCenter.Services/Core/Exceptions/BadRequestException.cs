namespace DeploymentCenter.Services.Core.Exceptions;

public enum ServicesStatusCode
{
    Unknown = 0,
    Duplicate = 1,
    PortsRequired = 2,
}

public class BadRequestException(ServicesStatusCode servicesStatusCode) : Exception
{
    public ServicesStatusCode ServicesStatusCode { get; private set; } = servicesStatusCode;
}