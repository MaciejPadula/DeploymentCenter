namespace DeploymentCenter.Infrastructure.Http;

internal interface IKubeConfigDecoder
{
    string DecodeKubeConfig(string encodedKubeConfig);
}
