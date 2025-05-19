using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Assistant.Features.GetDeploymentStatus.Contract;

public record GetDeploymentStatusQuery(string Namespace, string DeploymentName) : IRequest<Result<string>>;
