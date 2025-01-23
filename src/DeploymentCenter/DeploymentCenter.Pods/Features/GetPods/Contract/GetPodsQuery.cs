using DeploymentCenter.Pods.Core.Models;
using MediatR;

namespace DeploymentCenter.Pods.Features.GetPods.Contract;

public readonly record struct GetPodsQuery(
    string Namespace,
    string NamePrefix) : IRequest<List<Pod>>;
