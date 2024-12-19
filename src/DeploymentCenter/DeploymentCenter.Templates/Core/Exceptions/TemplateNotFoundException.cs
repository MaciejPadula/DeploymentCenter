namespace DeploymentCenter.Templates.Core.Exceptions;

public class TemplateNotFoundException(string Name) : Exception($"Exception with name: {Name} was not found")
{
}
