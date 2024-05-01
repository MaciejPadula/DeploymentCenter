using ArchUnitNET.Domain;
using ArchUnitNET.Loader;

namespace DeploymentCenter.ArchitectureTests;

internal class ArchitectureFixture
{
    public static readonly System.Reflection.Assembly[] ApiAssemblies =
    [
        System.Reflection.Assembly.Load("DeploymentCenter.Deployments.Api")
    ];

    public static readonly System.Reflection.Assembly[] contractAsemblies =
    [
        System.Reflection.Assembly.Load("DeploymentCenter.Deployments.Contract")
    ];

    public static readonly System.Reflection.Assembly[] infrastructureAssemblies =
    [
        System.Reflection.Assembly.Load("DeploymentCenter.Deployments.Infrastructure")
    ];

    public static readonly System.Reflection.Assembly[] LogicAssemblies =
    [
        System.Reflection.Assembly.Load("DeploymentCenter.Deployments")
    ];

    public static System.Reflection.Assembly MainAssembly = System.Reflection.Assembly.Load("DeploymentCenter");

    public static readonly Architecture Architecture = new ArchLoader().LoadAssemblies(
    [
        MainAssembly,
        ..ApiAssemblies,
        ..contractAsemblies,
        ..infrastructureAssemblies,
        ..LogicAssemblies
    ]).Build();
}
