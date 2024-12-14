using DeploymentCenter.AIChat.Core.Exceptions;
using DeploymentCenter.AIChat.Features.CompleteChat.Contract;
using DeploymentCenter.SharedKernel;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace DeploymentCenter.AIChat.Features.CompleteChat;

internal class CompleteChatHandler(IAIChatProvider aIChatProvider, IMemoryCache memoryCache) : IRequestHandler<CompleteChatQuery, Result<string>>
{
    private static readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(30);

    public async Task<Result<string>> Handle(CompleteChatQuery request, CancellationToken cancellationToken)
    {
        if (!aIChatProvider.IsChatClientInitialized)
        {
            return new AIClientNotInitializedException();
        }

        var client = aIChatProvider.GetChatClient();

        return await memoryCache.GetOrCreateAsync(
            request.QueryKey,
            async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = CacheExpiration;
                return await client.CompleteChatAsync(request.Messages);
            }) ?? string.Empty;
    }
}
