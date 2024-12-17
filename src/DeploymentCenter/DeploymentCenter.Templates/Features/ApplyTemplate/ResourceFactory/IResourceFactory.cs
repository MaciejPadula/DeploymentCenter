using DeploymentCenter.SharedKernel;
using DeploymentCenter.Templates.Core.Models;
using MediatR;

namespace DeploymentCenter.Templates.Features.ApplyTemplate.ResourceFactory;

internal interface IResourceFactory
{
    bool CanCreate(ResourceType type);
    IRequest<Result> Create(Dictionary<string, string> compiledVariables);
}
