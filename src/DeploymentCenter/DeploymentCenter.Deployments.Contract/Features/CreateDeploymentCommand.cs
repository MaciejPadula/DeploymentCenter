using DeploymentCenter.Deployments.Contract.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public record CreateDeploymentCommand(
    string Namespace,
    string Name,
    string ApplicationName,
    int Replicas,
    List<Container> Containers) : IRequest;