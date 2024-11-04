using DeploymentCenter.Deployments.Features;
using DeploymentCenter.Infrastructure.Http;
using DeploymentCenter.Infrastructure.K8s.Client;
using DeploymentCenter.Infrastructure.K8s.Implementations;
using DeploymentCenter.Infrastructure.K8s.Mappers;
using DeploymentCenter.Infrastructure.Security;
using DeploymentCenter.Metrics.Features;
using DeploymentCenter.Namespaces.Features;
using DeploymentCenter.Security.Features.SecurePassword;
using DeploymentCenter.Services.Features;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IKubeConfigProvider, HttpContextKubeConfigProvider>();
        services.AddScoped<IKubernetesClientFactory, KubernetesClientFactory>();
        services.AddTransient<IServiceClient, K8sServiceClient>();
        services.AddTransient<IDeploymentClient, K8sDeploymentClient>();
        services.AddTransient<IPodClient, K8sPodClient>();
        services.AddTransient<INamespaceClient, K8sNamespaceClient>();
        services.AddTransient<IMetricsClient, K8sMetricsClient>();
        services.AddTransient<IK8sServiceMapper, K8sServiceMapper>();
        services.AddTransient<IK8sDeploymentMapper, K8sDeploymentMapper>();

        services.AddTransient<IKubeConfigDecoder, Base64PasswordSecurity>();
        services.AddTransient<IPasswordSecurity, Base64PasswordSecurity>();

        return services;
    }
}
