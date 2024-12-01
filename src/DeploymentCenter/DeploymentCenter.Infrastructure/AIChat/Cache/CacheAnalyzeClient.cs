using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features;
using Microsoft.Extensions.Caching.Memory;

namespace DeploymentCenter.Infrastructure.AIChat.Cache;

internal class CacheAnalyzeClient(IAnalyzeClient analyzeClient, IMemoryCache memoryCache) : IAnalyzeClient
{
    private static readonly TimeSpan CacheTTL = TimeSpan.FromMinutes(45);

    public async Task<string> AnalyzeDeploymentStatus(DeploymentStatusDetails deploymentStatusDetails) =>
        await memoryCache.GetOrCreateAsync(
            $"{nameof(AIChatAnalyzeClient)}_{nameof(AnalyzeDeploymentStatus)}_{GetCacheKey(deploymentStatusDetails)}",
            async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = CacheTTL;
                return await analyzeClient.AnalyzeDeploymentStatus(deploymentStatusDetails);
            }) ?? string.Empty;

    private static string GetCacheKey(DeploymentStatusDetails deploymentStatusDetails) =>
        $"{deploymentStatusDetails.DeploymentName}_{string.Join("__", deploymentStatusDetails.PodsStatuses.Select(x => $"{x.Key}&{x.Value}"))}_{deploymentStatusDetails.UserAdditionalDetails}";
}
