namespace DeploymentCenter.Security.Features.SecurePassword;

public interface IPasswordSecurity
{
    string SecurePassword(string plainText);
}
