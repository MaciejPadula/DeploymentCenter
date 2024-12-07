using DeploymentCenter.Api.Framework.Endpoints;
using DeploymentCenter.Volumes.Api.Core;
using DeploymentCenter.Volumes.Features.GetVolumes.Contract;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DeploymentCenter.Volumes.Api.Features;

internal class GetVolumesEndpoint() : ApiGetEndpointBase(new VolumesApiDefinition())
{
    internal record Volume(string Name, string Path, int CapacityInKibiBytes);

    internal record GetVolumesResponse(List<Volume> Volumes);

    protected override Delegate Handler => async (
        IMediator mediator,
        CancellationToken cancellationToken) =>
    {
        var volumes = await mediator.Send(new GetVolumesQuery(), cancellationToken);
        var mappedVolumes = volumes
            .Select(v => new Volume(v.Name, v.Path, v.CapacityInKibiBytes))
            .ToList();

        return Results.Ok(new GetVolumesResponse(mappedVolumes));
    };
}
