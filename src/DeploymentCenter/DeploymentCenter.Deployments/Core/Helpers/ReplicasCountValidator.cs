﻿namespace DeploymentCenter.Deployments.Core.Helpers;

internal interface IReplicasCountValidator
{
    bool Validate(int replicasCount);
}

internal class ReplicasCountValidator : IReplicasCountValidator
{
    public bool Validate(int replicasCount)
    {
        return replicasCount >= 0;
    }
}
