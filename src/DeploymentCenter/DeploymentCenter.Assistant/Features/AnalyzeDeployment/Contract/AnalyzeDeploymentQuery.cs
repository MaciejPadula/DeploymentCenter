using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Assistant.Features.AnalyzeDeployment.Contract;

public record AnalyzeDeploymentQuery(
    string Namespace,
    string DeploymentName,
    string UserQuestion) : IRequest<Result<string>>;
