using DeploymentCenter.Deployments.Features.AnalyzeDeployment;
using DeploymentCenter.Infrastructure.AIChat.Implementations;
using Microsoft.Extensions.Caching.Memory;

namespace DeploymentCenter.Infrastructure.AIChat.Cache;

internal class CacheDeploymentAnalyzeClient(IDeploymentAnalyzeClient analyzeClient, IMemoryCache memoryCache) : IDeploymentAnalyzeClient
{
    private static readonly TimeSpan CacheTTL = TimeSpan.FromMinutes(45);

    public async Task<string> AnalyzeDeploymentStatus(DeploymentStatusDetails deploymentStatusDetails) =>
        await memoryCache.GetOrCreateAsync(
            $"{nameof(AIChatDeploymentAnalyzeClient)}_{nameof(AnalyzeDeploymentStatus)}_{GetCacheKey(deploymentStatusDetails)}",
            async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = CacheTTL;
                return await analyzeClient.AnalyzeDeploymentStatus(deploymentStatusDetails);
            }) ?? string.Empty;

    private static string GetCacheKey(DeploymentStatusDetails deploymentStatusDetails) =>
        $"{deploymentStatusDetails.Details.Namespace}_{deploymentStatusDetails.Details.Name}_{deploymentStatusDetails.UserQuestion}";
}
