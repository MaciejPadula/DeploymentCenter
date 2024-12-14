using DeploymentCenter.Infrastructure.AIChat.Implementations;
using DeploymentCenter.Services.Features.AnalyzeLoadBalancer;
using Microsoft.Extensions.Caching.Memory;

namespace DeploymentCenter.Infrastructure.AIChat.Cache;

internal class CacheServiceAnalyzeClient(IServiceAnalyzeClient analyzeClient, IMemoryCache memoryCache) : IServiceAnalyzeClient
{
    private static readonly TimeSpan CacheTTL = TimeSpan.FromMinutes(45);

    public async Task<string> AnalyzeLoadBalancer(LoadBalancerAnalyzeContext analyzeContext) =>
        await memoryCache.GetOrCreateAsync(
            $"{nameof(AIChatServiceAnalyzeClient)}_{nameof(AnalyzeLoadBalancer)}_{GetCacheKey(analyzeContext)}",
            async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = CacheTTL;
                return await analyzeClient.AnalyzeLoadBalancer(analyzeContext);
            }) ?? string.Empty;

    private static string GetCacheKey(LoadBalancerAnalyzeContext analyzeContext) =>
        $"{analyzeContext.Details.Namespace}_{analyzeContext.Details.Name}_{analyzeContext.UserQuestion}";


}
