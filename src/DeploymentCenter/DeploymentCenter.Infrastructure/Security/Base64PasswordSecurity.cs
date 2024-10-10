using DeploymentCenter.Infrastructure.Http;
using DeploymentCenter.Security.Infrastructure;
using System.Text;

namespace DeploymentCenter.Infrastructure.Security;

internal class Base64PasswordSecurity : IPasswordSecurity, IKubeConfigDecoder
{
    public string DecodeKubeConfig(string encodedKubeConfig)
    {
        var base64EncodedBytes = Convert.FromBase64String(encodedKubeConfig);
        return Encoding.UTF8.GetString(base64EncodedBytes);
    }

    public string SecurePassword(string plainText)
    {
        var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
        return Convert.ToBase64String(plainTextBytes);
    }
}
