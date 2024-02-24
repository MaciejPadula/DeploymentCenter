namespace DeploymentCenter.Services.Contract.Models;

public readonly record struct Port(
    string Protocol,
    int HostPort,
    string TargetPort);
