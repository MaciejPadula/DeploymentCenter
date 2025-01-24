using DeploymentCenter.Search.Core.Models;
using MediatR;

namespace DeploymentCenter.Search.Features.SearchResources.Contract;

public record SearchResourcesQuery(string QueryPhrase) : IRequest<Dictionary<string, List<Resource>>>;
