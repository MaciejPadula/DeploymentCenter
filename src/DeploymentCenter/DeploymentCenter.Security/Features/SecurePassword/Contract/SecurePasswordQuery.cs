using MediatR;

namespace DeploymentCenter.Security.Features.SecurePassword.Contract;

public record SecurePasswordQuery(string PlainText) : IRequest<string>;