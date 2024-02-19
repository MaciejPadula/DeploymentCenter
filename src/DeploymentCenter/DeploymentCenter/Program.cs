using DeploymentCenter.Deployments;
using DeploymentCenter.Images;
using DeploymentCenter.SharedKernel;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register modules
builder.Services.AddImagesModule();
builder.Services.AddDeploymentsModule();
builder.Services.AddSharedKernelModule();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();