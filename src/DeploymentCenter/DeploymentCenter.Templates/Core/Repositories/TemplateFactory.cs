using DeploymentCenter.Templates.Core.Models;

namespace DeploymentCenter.Templates.Core.Repositories;

internal class TemplateFactory
{
    public static ResourceTemplate CreateSimpleWebAppTemplate()
    {
        var deploy = new Resource(
            "BasicDeploy",
            ResourceType.Deployment,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("ContainerName", "{containerName}"),
                new Variable("Image", "{imageName}"),
                new Variable("Name", "{appName}-deploy"),
                new Variable("Replicas", "{replicas}"),
                new Variable("Port", "{imageExposedPort}"),
                new Variable("HostPort", "8080"),
                new Variable("EnvVariables", "")
            ]);

        var lb = new Resource(
            "BasicLb",
            ResourceType.LoadBalancer,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("Name", "{appName}-lb"),
                new Variable("Ports", "{port}:8080"),
                new Variable("IpAddresses", "{ipAddress}")
            ]);

        return new ResourceTemplate(
            Guid.NewGuid(),
            "simple-web-app",
            [
                new("appName", "Application Name", "simple-web-app"),
                new("namespace", "Namespace", "default"),
                new("containerName", "Container Name", "webapp-container"),
                new("imageName", "Docker Image", "helloworld"),
                new("replicas", "Replicas Count", "1"),
                new("imageExposedPort", "Image Exposed Port", "8080"),
                new("port", "Load Balancer Exposed Port", "80"),
                new("ipAddress", "Ip Address", "172.30.255.251")
            ],
            [deploy, lb]);
    }

    public static ResourceTemplate CreateSqlServerTemplate()
    {
        var deploy = new Resource(
            "BasicDeploy",
            ResourceType.Deployment,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("ContainerName", "sql-server"),
                new Variable("Image", "mcr.microsoft.com/mssql/server:2022-latest"),
                new Variable("Name", "{appName}-deploy"),
                new Variable("Replicas", "1"),
                new Variable("Port", "1433"),
                new Variable("HostPort", "1433"),
                new Variable("EnvVariables", "MSSQL_SA_PASSWORD:{saPassword},ACCEPT_EULA:Y")
            ]);

        var lb = new Resource(
            "BasicLb",
            ResourceType.LoadBalancer,
            [
                new Variable("Namespace", "{namespace}"),
                new Variable("ApplicationName", "{appName}"),
                new Variable("Name", "{appName}-lb"),
                new Variable("Ports", "{port}:1433"),
                new Variable("IpAddresses", "{ipAddress}")
            ]);

        return new ResourceTemplate(
            Guid.NewGuid(),
            "sql-server",
            [
                new("appName", "Application Name", "sql-server"),
                new("port", "Port", "1433"),
                new("ipAddress", "Ip Address", "172.30.255.251"),
                new("namespace", "Namespace", "default"),
                new("saPassword", "SA Password", "zaq1@WSX")
            ],
            [deploy, lb]);
    }
}
