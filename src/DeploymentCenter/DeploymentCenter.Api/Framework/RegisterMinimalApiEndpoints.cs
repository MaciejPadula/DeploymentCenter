using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Reflection;

namespace DeploymentCenter.Api.Framework;

public static class RegisterMinimalApiEndpoints
{
    public static void RegisterEndpoints(this IServiceCollection services, Assembly assembly)
    {
        var serviceDescriptors = assembly
            .DefinedTypes
            .Where(x => typeof(IApiEndpoint).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
            .Select(type => ServiceDescriptor.Transient(typeof(IApiEndpoint), type))
            .ToArray();

        services.TryAddEnumerable(serviceDescriptors);
    }

    public static void MapEndpoints(this WebApplication app)
    {
        var endpoints = app.Services.GetRequiredService<IEnumerable<IApiEndpoint>>();

        foreach (IApiEndpoint endpoint in endpoints)
        {
            endpoint.Map(app);
        }
    }
}
