using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Extensions;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;
using System.Xml.Linq;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerDetailsHandler : IRequestHandler<GetLoadBalancerDetailsQuery, LoadBalancerDetails?>
{
    private readonly IKubernetesClientWrapper _kubernetesClient;

    public GetLoadBalancerDetailsHandler(IKubernetesClientWrapper kubernetesClient)
    {
        _kubernetesClient = kubernetesClient;
    }

    public async Task<LoadBalancerDetails?> Handle(GetLoadBalancerDetailsQuery request, CancellationToken cancellationToken)
    {
        var services = await _kubernetesClient.GetServices(request.Namespace);

        return services.Items
            .Where(x => x.Spec.Type == Consts.LoadBalancerKey && x.Metadata.Name == request.LoadBalancerName)
            .Select(x => x.ToLBDetails())
            .FirstOrDefault() ;
    }
}
