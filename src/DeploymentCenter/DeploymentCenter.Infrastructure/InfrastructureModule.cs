using DeploymentCenter.Deployments.Infrastructure;
using DeploymentCenter.Infrastructure.Http;
using DeploymentCenter.Infrastructure.K8s;
using DeploymentCenter.Infrastructure.Security;
using DeploymentCenter.Namespaces.Infrastructure;
using DeploymentCenter.Security.Infrastructure;
using DeploymentCenter.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Infrastructure;

public static class InfrastructureModule
{
    public static IServiceCollection AddInfrastructureModule(this IServiceCollection services)
    {
        services.AddScoped<IKubeConfigProvider, HttpContextKubeConfigProvider>();
        services.AddScoped<IKubernetesClientFactory, KubernetesClientFactory>();
        services.AddTransient<IServiceClient, K8sServiceClient>();
        services.AddTransient<IDeploymentClient, K8sDeploymentClient>();
        services.AddTransient<INamespaceClient, K8sNamespaceClient>();

        services.AddTransient<IKubeConfigDecoder, Base64PasswordSecurity>();
        services.AddTransient<IPasswordSecurity, Base64PasswordSecurity>();

        return services;
    }
}
