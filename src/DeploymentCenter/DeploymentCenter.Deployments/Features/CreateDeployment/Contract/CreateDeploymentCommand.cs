using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Deployments.Features.CreateDeployment.Contract;

public record CreateDeploymentCommand(
    string Namespace,
    string Name,
    string ApplicationName,
    int Replicas,
    List<Container> Containers) : IRequest<Result>;