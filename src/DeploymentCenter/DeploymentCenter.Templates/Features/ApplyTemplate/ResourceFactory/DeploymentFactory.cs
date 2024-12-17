using DeploymentCenter.Deployments.Core.Models;
using DeploymentCenter.Deployments.Features.CreateDeployment.Contract;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.Templates.Core.Models;
using MediatR;

namespace DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;

internal class DeploymentFactory() : IResourceFactory
{
    public bool CanCreate(ResourceType type) => type == ResourceType.Deployment;

    public IRequest<Result> Create(Dictionary<string, string> compiledVariables)
    {
        var envVariables = compiledVariables["EnvVariables"]
            .Split(",")
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Split(":"))
            .Where(x => x.Length == 2)
            .Select(x => new EnvironmentVariable(x[0], x[1], null))
            .ToList();

        var port = int.Parse(compiledVariables["Port"]);
        var hostPort = int.Parse(compiledVariables["HostPort"]);

        var containerPort = new ContainerPort(port, hostPort);

        var containers = new List<Container>
        {
            new(compiledVariables["ContainerName"], compiledVariables["Image"], [containerPort], [], envVariables)
        };

        var deployment = new CreateDeploymentCommand(
            compiledVariables["Namespace"],
            compiledVariables["Name"],
            compiledVariables["ApplicationName"],
            int.Parse(compiledVariables["Replicas"]),
            containers);

        return deployment;
    }
}
