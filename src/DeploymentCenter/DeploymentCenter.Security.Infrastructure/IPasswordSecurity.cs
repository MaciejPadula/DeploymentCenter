namespace DeploymentCenter.Security.Infrastructure;

public interface IPasswordSecurity
{
    string SecurePassword(string plainText);
}
