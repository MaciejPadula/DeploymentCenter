namespace DeploymentCenter.SharedKernel.Exceptions;

public class BadRequestException(BadRequestStatusCode applicationErrorStatusCode) : Exception()
{
    public BadRequestStatusCode ApplicationErrorStatusCode { get; private set; } = applicationErrorStatusCode;
}

