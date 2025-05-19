using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Assistant.Features.AnalyzeLoadBalancer.Contract;

public record AnalyzeLoadBalancerQuery(
    string Namespace,
    string LoadBalancerName,
    string UserQuestion) : IRequest<Result<string>>;
