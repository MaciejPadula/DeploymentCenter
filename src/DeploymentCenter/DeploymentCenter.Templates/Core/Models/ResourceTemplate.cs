using System.Runtime.CompilerServices;

namespace DeploymentCenter.Templates.Core.Models;

public record Variable(
    string Name, string ValueTemplate);

public record UserVariable(string Name, string DisplayName, string Value);

public record ResourceTemplate(
    Guid Id,
    string Name,
    List<UserVariable> ConfigurableVariables,
    List<Resource> Resources);

public enum ResourceType
{
    Unknown = 0,
    Deployment = 1,
    LoadBalancer = 2,
    Volume = 3
}

public record Resource(
    string Name,
    ResourceType Type,
    List<Variable> VariableMap);
