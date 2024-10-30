using DeploymentCenter.Api.Framework;
using DeploymentCenter.Deployments;
using DeploymentCenter.Deployments.Api;
using DeploymentCenter.Images;
using DeploymentCenter.Infrastructure;
using DeploymentCenter.Namespaces;
using DeploymentCenter.Namespaces.Api;
using DeploymentCenter.Security;
using DeploymentCenter.Security.Api;
using DeploymentCenter.Services;
using DeploymentCenter.Services.Api;
using DeploymentCenter.SharedKernel;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

builder.Services.AddImagesModule();

builder.Services.AddDeploymentsModule();
builder.Services.RegisterDeploymentsEndpoints();

builder.Services.AddServicesModule();
builder.Services.RegisterServicesEndpoints();

builder.Services.AddNamespacesModule();
builder.Services.RegisterNamespacesEndpoints();

builder.Services.RegisterSecurityEndpoints();
builder.Services.AddSecurityModule();

builder.Services.AddInfrastructureModule();
builder.Services.AddSharedKernelModule();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.MapEndpoints();
app.UseMiddlewares();

app.UseHttpsRedirection();

app.Run();