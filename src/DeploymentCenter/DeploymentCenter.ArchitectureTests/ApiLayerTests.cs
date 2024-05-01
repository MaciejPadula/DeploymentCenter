using ArchUnitNET.Domain;
using ArchUnitNET.NUnit;
using static ArchUnitNET.Fluent.ArchRuleDefinition;

namespace DeploymentCenter.ArchitectureTests;

public class ApiLayerTests
{
    private readonly IObjectProvider<IType> ApiLayer = Types().That()
        .ResideInAssembly(System.Reflection.Assembly.Load("DeploymentCenter.Deployments.Api"));

    [Test]
    public void AllTypesExceptEndpointsInApiLayer_ShouldBeInternal()
    {
        var rule = Types()
            .That().Are(ApiLayer)
            .And().DoNotHaveNameEndingWith("Endpoints")
            .Should()
            .BeInternal();

        rule.Check(ArchitectureFixture.Architecture);
    }
}
