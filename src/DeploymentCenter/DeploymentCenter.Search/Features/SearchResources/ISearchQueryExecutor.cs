﻿using DeploymentCenter.Search.Core.Models;

namespace DeploymentCenter.Search.Features.SearchResources;

public interface ISearchQueryExecutor
{
    Task<List<Resource>> QueryAllResources();
}
