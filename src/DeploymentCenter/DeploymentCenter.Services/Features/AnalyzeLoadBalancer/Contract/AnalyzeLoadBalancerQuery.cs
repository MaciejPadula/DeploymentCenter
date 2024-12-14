﻿using MediatR;

namespace DeploymentCenter.Services.Features.AnalyzeLoadBalancer.Contract;

public record AnalyzeLoadBalancerQuery(
    string Namespace,
    string LoadBalancerName,
    string UserQuestion) : IRequest<string>;
