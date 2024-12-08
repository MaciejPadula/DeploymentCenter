using DeploymentCenter.Volumes.Core.Models;
using MediatR;

namespace DeploymentCenter.Volumes.Features.GetVolumes.Contract;

public record GetVolumesQuery() : IRequest<List<Volume>>;