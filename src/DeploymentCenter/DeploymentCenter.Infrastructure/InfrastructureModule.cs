using DeploymentCenter.AIChat.Features;
using DeploymentCenter.Deployments.Features;
using DeploymentCenter.Infrastructure.Elastic;
using DeploymentCenter.Infrastructure.Http;
using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Infrastructure.K8s.Implementations;
using DeploymentCenter.Infrastructure.K8s.Mappers;
using DeploymentCenter.Infrastructure.OpenAI;
using DeploymentCenter.Infrastructure.Security;
using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Namespaces.Features;
using DeploymentCenter.Search.Features.IndexResources;
using DeploymentCenter.Search.Features.SearchResources;
using DeploymentCenter.Security.Features.SecurePassword;
using DeploymentCenter.Services.Features;
using DeploymentCenter.Volumes.Features;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddScoped<IKubeConfigProvider, HttpContextKubeConfigProvider>();
        services.AddScoped<IKubernetesClientFactory, KubernetesClientFactory>();
        services.AddTransient<IServiceClient, K8sServiceClient>();
        services.AddTransient<IDeploymentClient, K8sDeploymentClient>();
        services.AddTransient<IPodClient, K8sPodClient>();
        services.AddTransient<INamespaceClient, K8sNamespaceClient>();
        services.AddTransient<IMetricsClient, K8sMetricsClient>();
        services.AddTransient<IK8sServiceMapper, K8sServiceMapper>();
        services.AddTransient<IK8sDeploymentMapper, K8sDeploymentMapper>();
        services.AddTransient<IK8sPodMapper, K8sPodMapper>();
        services.AddTransient<IVolumeClient, K8sVolumeClient>();

        services.AddTransient<IResourceProvider, K8sResourceProvider>();
        services.AddTransient<ISearchQueryExecutor, K8sResourceProvider>();
        services.AddTransient<IResourceIndexer, ElasticResourceIndexer>();

        services.AddTransient<IKubeConfigDecoder, Base64PasswordSecurity>();
        services.AddTransient<IPasswordSecurity, Base64PasswordSecurity>();

        services.AddTransient<IAIChatProvider, OpenAIChatClientProvider>();

        return services;
    }
}
