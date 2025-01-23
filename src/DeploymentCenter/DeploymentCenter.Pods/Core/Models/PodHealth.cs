namespace DeploymentCenter.Pods.Core.Models;

public enum PodHealth
{
    Unknown = 0,
    Waiting = 1,
    Running = 2,
    Terminated = 3,
    Completed = 4
}
