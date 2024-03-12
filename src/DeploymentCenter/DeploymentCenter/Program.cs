using DeploymentCenter.Deployments;
using DeploymentCenter.Images;
using DeploymentCenter.Namespaces;
using DeploymentCenter.Services;
using DeploymentCenter.SharedKernel;

var builder = WebApplication.CreateBuilder(args);

// Add ASP.NET
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// Register modules
builder.Services.AddImagesModule();
builder.Services.AddDeploymentsModule();
builder.Services.AddServicesModule();
builder.Services.AddNamespacesModule();
builder.Services.AddSharedKernelModule();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global CORS policy
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // Allow any origin
    .AllowCredentials()); // Allow credentials

app.UseHttpsRedirection();
app.MapControllers();

app.Run();