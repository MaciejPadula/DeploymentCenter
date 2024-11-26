using DeploymentCenter.Api.Framework;
using DeploymentCenter.Deployments;
using DeploymentCenter.Deployments.Api;
using DeploymentCenter.Infrastructure;
using DeploymentCenter.Metrics;
using DeploymentCenter.Metrics.Api;
using DeploymentCenter.Namespaces;
using DeploymentCenter.Namespaces.Api;
using DeploymentCenter.Security;
using DeploymentCenter.Security.Api;
using DeploymentCenter.Services;
using DeploymentCenter.Services.Api;
using DeploymentCenter.SharedKernel;

var builder = WebApplication.CreateBuilder(args);

// Add api specific services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

// Add presentation layer
builder.Services.RegisterDeploymentsEndpoints();
builder.Services.RegisterServicesEndpoints();
builder.Services.RegisterNamespacesEndpoints();
builder.Services.RegisterSecurityEndpoints();
builder.Services.RegisterMetricsEndpoints();

// Add application layer
builder.Services.AddDeploymentsModule();
builder.Services.AddServicesModule();
builder.Services.AddNamespacesModule();
builder.Services.AddSecurityModule();
builder.Services.AddMetricsModule();

// Add infrastructure layer
builder.Services.AddInfrastructure();

// Add libraries
builder.Services.AddSharedKernelModule();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

// Map presentation layer
app.MapEndpoints();
app.UseMiddlewares();

app.UseHttpsRedirection();

app.Run();

public partial class Program { }