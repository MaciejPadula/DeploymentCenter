﻿using DeploymentCenter.Deployments.Core.Models;
using MediatR;

namespace DeploymentCenter.Deployments.Features.GetDeploymentPods.Contract;

public readonly record struct GetDeploymentPodsQuery(
    string Namespace,
    string DeploymentName) : IRequest<List<Pod>>;
