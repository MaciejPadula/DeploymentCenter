using MediatR;

namespace DeploymentCenter.Security.Contract.Features;

public record SecurePasswordQuery(string PlainText) : IRequest<string>;