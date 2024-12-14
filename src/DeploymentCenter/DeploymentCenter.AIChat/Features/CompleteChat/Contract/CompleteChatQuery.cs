using DeploymentCenter.AIChat.Core.Models;
using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.AIChat.Features.CompleteChat.Contract;

public record CompleteChatQuery(string QueryKey, IEnumerable<Message> Messages) : IRequest<Result<string>>;
