using DeploymentCenter.Deployments.Shared.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.CreateDeployment.Contract;

public record CreateDeploymentCommand(
    string Namespace,
    string Name,
    string ApplicationName,
    int Replicas,
    List<Container> Containers) : IRequest;