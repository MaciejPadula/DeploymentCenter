using DeploymentCenter.Templates.Core.Repositories;
using DeploymentCenter.Templates.Features.ApplyTemplate;
using DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;
using Microsoft.Extensions.DependencyInjection;

namespace DeploymentCenter.Templates;

public static class TemplatesModule
{
    public static void AddTemplatesModule(this IServiceCollection services)
    {
        services.AddTransient<IResourceFactory, DeploymentFactory>();
        services.AddTransient<IResourceFactory, LoadBalancerFactory>();
        services.AddTransient<IVariableReplacer, VariableReplacer>();

        services.AddSingleton<ITemplateRepository, DefaultTemplateRepository>();
    }
}
