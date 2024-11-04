﻿namespace DeploymentCenter.Deployments.Core.Models;

public readonly record struct Container(
    string Name,
    string Image,
    List<ContainerPort> Ports,
    List<EnvironmentVariable> EnvironmentVariables);
