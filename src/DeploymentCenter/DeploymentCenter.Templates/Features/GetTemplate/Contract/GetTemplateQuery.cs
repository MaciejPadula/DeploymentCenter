using DeploymentCenter.Templates.Core.Models;
using MediatR;

namespace DeploymentCenter.Templates.Features.GetTemplate.Contract;

public record GetTemplateQuery(string Name) : IRequest<ResourceTemplate?>;
