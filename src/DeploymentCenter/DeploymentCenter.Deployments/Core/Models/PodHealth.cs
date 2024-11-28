namespace DeploymentCenter.Deployments.Core.Models;

public enum PodHealth
{
    Unknown = 0,
    Waiting = 1,
    Running = 2,
    Terminated = 3
}
