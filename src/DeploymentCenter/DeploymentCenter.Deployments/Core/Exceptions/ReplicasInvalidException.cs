namespace DeploymentCenter.Deployments.Core.Exceptions;

public class ReplicasInvalidException : Exception
{
    public ReplicasInvalidException(int replicasCount)
        : base($"Replicas count {replicasCount} is invalid.")
    {
    }
}
