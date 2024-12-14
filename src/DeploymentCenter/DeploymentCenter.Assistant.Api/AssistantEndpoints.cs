using Microsoft.Extensions.DependencyInjection;
using DeploymentCenter.Api.Framework;

namespace DeploymentCenter.Assistant.Api;

public static class AssistantEndpoints
{
    public static void RegisterAssistantEndpoints(this IServiceCollection services)
    {
        services.RegisterEndpoints(typeof(AssistantEndpoints).Assembly);
    }
}
