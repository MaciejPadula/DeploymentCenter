using DeploymentCenter.Deployments;
using DeploymentCenter.Images;
using DeploymentCenter.Namespaces;
using DeploymentCenter.Services;
using DeploymentCenter.SharedKernel;
using DeploymentCenter.Infrastructure;
using DeploymentCenter.Deployments.Api;
using DeploymentCenter.Services.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddImagesModule();
builder.Services.AddDeploymentsModule();
builder.Services.AddServicesModule();
builder.Services.AddNamespacesModule();

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

app.UseHttpsRedirection();
app.MapControllers();
app.MapDeploymentsEndpoints();
app.MapServicesEndpoints();

app.Run();