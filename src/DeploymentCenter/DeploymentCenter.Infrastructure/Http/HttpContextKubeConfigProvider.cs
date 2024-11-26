using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Infrastructure.Http;

internal interface IKubeConfigProvider
{
    string GetKubeConfig();
}

internal class HttpContextKubeConfigProvider(IHttpContextAccessor httpContextAccessor, IKubeConfigDecoder kubeConfigDecoder) : IKubeConfigProvider
{
    private const string KubeConfigHeaderKey = "Auth";

    public string GetKubeConfig()
    {
        var value = httpContextAccessor.HttpContext?.Request.Headers[KubeConfigHeaderKey];
        ArgumentException.ThrowIfNullOrEmpty(value, KubeConfigHeaderKey);
        return kubeConfigDecoder.DecodeKubeConfig(value!);
    }
}
