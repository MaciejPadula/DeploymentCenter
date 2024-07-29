using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerPortsHandler : IRequestHandler<GetLoadBalancerPortsQuery, List<LoadBalancerPort>>
{
    private readonly IKubernetesClientWrapper _kubernetesClient;

    public GetLoadBalancerPortsHandler(IKubernetesClientWrapper kubernetesClient)
    {
        _kubernetesClient = kubernetesClient;
    }

    public async Task<List<LoadBalancerPort>> Handle(GetLoadBalancerPortsQuery request, CancellationToken cancellationToken)
    {
        var services = await _kubernetesClient.GetServices(request.Namespace);

        return services.Items
            .Where(x => x.Spec.Type == Consts.LoadBalancerKey && x.Metadata.Name == request.LoadBalancerName)
            .SelectMany(x => x.Spec.Ports)
            .Select(x => new LoadBalancerPort(x.Port, int.Parse(x.TargetPort.Value)))
            .ToList();
    }
}
