using Microsoft.AspNetCore.Http;
using System.Text;

namespace DeploymentCenter.Infrastructure.Http;

internal interface IKubeConfigProvider
{
    string GetKubeConfig();
}

internal class HttpContextKubeConfigProvider(IHttpContextAccessor httpContextAccessor) : IKubeConfigProvider
{
    private const string KubeConfigHeaderKey = "Auth";

    public string GetKubeConfig()
    {
        var value = httpContextAccessor.HttpContext.Request.Headers[KubeConfigHeaderKey];
        var data = Convert.FromBase64String(value);
        return Encoding.UTF8.GetString(data);
    }
}
