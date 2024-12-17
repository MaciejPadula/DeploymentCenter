using DeploymentCenter.SharedKernel;
using MediatR;

namespace DeploymentCenter.Templates.Features.ApplyTemplate.Contract;

public record ApplyTemplateCommand(
    string TemplateName,
    Dictionary<string, string> Variables) : IRequest<Result>;
