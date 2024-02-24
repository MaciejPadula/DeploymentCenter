using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.SharedKernel;
using k8s.Models;
using System.Linq;

namespace DeploymentCenter.Services.Extensions;

internal static class V1ServiceExtensions
{
    public static IEnumerable<LoadBalancerBasicInfo> ToLBBasicInfo(this IEnumerable<V1Service> services) =>
        services.Select(x => x.ToLBBasicInfo());

    public static LoadBalancerBasicInfo ToLBBasicInfo(this V1Service service) =>
        new(service.Metadata.NamespaceProperty,
            service.Metadata.Name);

    public static LoadBalancerDetails ToLBDetails(this V1Service service) =>
        new(service.Metadata.NamespaceProperty,
            service.Metadata.Name,
            service.Spec.Selector[Consts.ApplicationNameDictionaryKey]);

}
