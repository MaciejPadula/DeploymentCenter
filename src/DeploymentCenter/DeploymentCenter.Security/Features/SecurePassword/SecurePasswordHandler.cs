using DeploymentCenter.Security.Features.SecurePassword.Contract;
using MediatR;

namespace DeploymentCenter.Security.Features.SecurePassword;

internal class SecurePasswordHandler(IPasswordSecurity passwordSecurity) : IRequestHandler<SecurePasswordQuery, string>
{
    public Task<string> Handle(SecurePasswordQuery request, CancellationToken cancellationToken) =>
        Task.FromResult(passwordSecurity.SecurePassword(request.PlainText));
}
