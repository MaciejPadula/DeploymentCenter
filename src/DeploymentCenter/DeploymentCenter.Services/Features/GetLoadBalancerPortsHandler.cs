﻿using DeploymentCenter.Services.Contract.Features;
using DeploymentCenter.Services.Contract.Models;
using DeploymentCenter.Services.Infrastructure;
using DeploymentCenter.Services.Shared;
using MediatR;

namespace DeploymentCenter.Services.Features;

internal class GetLoadBalancerPortsHandler(IServiceClient serviceClient) : IRequestHandler<GetLoadBalancerPortsQuery, List<LoadBalancerPort>>
{
    public async Task<List<LoadBalancerPort>> Handle(GetLoadBalancerPortsQuery request, CancellationToken cancellationToken)
    {
        return await serviceClient.GetLoadBalancerPorts(request.Namespace, request.LoadBalancerName);
    }
}
