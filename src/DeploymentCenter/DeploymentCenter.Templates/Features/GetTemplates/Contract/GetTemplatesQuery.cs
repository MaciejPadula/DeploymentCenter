using DeploymentCenter.Templates.Core.Models;
using MediatR;

namespace DeploymentCenter.Templates.Features.GetTemplates.Contract;

public record GetTemplatesQuery : IRequest<List<TemplateBasicDetails>>;
