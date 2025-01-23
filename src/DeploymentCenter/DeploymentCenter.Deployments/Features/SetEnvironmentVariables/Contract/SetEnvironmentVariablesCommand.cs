using DeploymentCenter.SharedKernel.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.SetEnvironmentVariables.Contract;

public record SetEnvironmentVariablesCommand(
    string Namespace,
    string DeploymentName,
    string ContainerName,
    List<EnvironmentVariable> EnvironmentVariables) : IRequest;
