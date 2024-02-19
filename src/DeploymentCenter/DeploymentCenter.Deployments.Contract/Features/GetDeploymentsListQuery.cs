using MediatR;

namespace DeploymentCenter.Deployments.Contract.Features;

public readonly record struct GetDeploymentsListQuery(
    string Namespace) : IRequest<object>;
