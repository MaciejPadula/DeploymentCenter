using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Helpers;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;
using System.Linq;
using System.Net;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerIpAddressesHandler : IRequestHandler<GetLoadBalancerIpAddressesQuery, List<IPAddress>>
{
    private readonly IKubernetesClientWrapper _kubernetesClient;
    private readonly IIpAddressParser _ipAddressParser;

    public GetLoadBalancerIpAddressesHandler(
        IKubernetesClientWrapper kubernetesClient,
        IIpAddressParser ipAddressParser)
    {
        _kubernetesClient = kubernetesClient;
        _ipAddressParser = ipAddressParser;
    }

    public async Task<List<IPAddress>> Handle(GetLoadBalancerIpAddressesQuery request, CancellationToken cancellationToken)
    {
        var services = await _kubernetesClient.GetServices(request.Namespace);

        return services.Items
            .Where(x => x.Spec.Type == Consts.LoadBalancerKey && x.Metadata.Name == request.LoadBalancerName)
            .SelectMany(x => x.Spec.ExternalIPs)
            .Select(_ipAddressParser.Parse)
            .ToList();
    }
}
